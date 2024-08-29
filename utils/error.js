

// onError 함수 정의
const onError = (err, port) => {
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
};

const errorHandler = (err, req, res, _) => {
    // set locals, only providing error in development
    res.locals.message = err.message || 'Not error';
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};

module.exports = { onError, errorHandler };
