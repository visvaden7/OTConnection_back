const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const logger = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv")
const passport = require("passport");
const passportConfig = require("./passport");
const { sequelize } = require("./models");
const app = express();
const routes = require('./routes/');

passportConfig();
dotenv.config()

const port = process.env.PORT || 8001
app.set("port", parseInt(port))

const onError = (err) => {
    if (err.syscall !== 'listen') {
        throw err;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (err.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw err;
    }
}

// cors처리
app.use(cors({
    origin: process.env.FRONT_SERVER_URL,
    credentials: true
}));


//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//DB

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

// //session
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,  // 초기화되지 않은 세션은 저장되지 않음
        secret: process.env.COOKIE_SECRET,  // 환경 변수에서 비밀키를 가져옴
        cookie: {
            httpOnly: true,  // 클라이언트 측에서 JavaScript로 쿠키 접근을 막음
            secure: process.env.NODE_ENV === 'production',  // HTTPS에서만 전송되도록 설정 (개발 환경에서는 false)
            maxAge: 1000 * 60 * 15,  // 쿠키의 수명: 15분
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());


//route
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(( err, req, res, next) => {
    // set locals, only providing error in development
    // console.log(req, res, next, err)
    res.locals.message = err.message || "not error";
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중")
})
app.on('error', onError)