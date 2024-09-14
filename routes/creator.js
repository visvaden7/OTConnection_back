const express = require("express")
const {getAllCreator} = require("../controller/creator");
const router = express.Router()

router.get("/getAllCreator", getAllCreator)

module.exports = router;