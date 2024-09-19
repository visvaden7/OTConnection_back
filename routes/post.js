const express = require("express")
const {getPostDetail} = require("../controller/post");
const router = express.Router()


router.get("/:id", getPostDetail)

module.exports = router;