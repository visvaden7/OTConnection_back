const express = require("express")
const router = express.Router()
const {getComments, addComments} = require("../controller/comments");

router.get('/:postId', getComments)

router.post('/', addComments)

module.exports = router