const express = require("express")
const router = express.Router()
const {getComments, addComments, deleteComments, updateComments} = require("../controller/comments");

router.get('/:postId', getComments)

router.post('/', addComments)

router.delete('/:comId', deleteComments)

router.put('/:comId', updateComments)

module.exports = router