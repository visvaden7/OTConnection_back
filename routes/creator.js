const express = require("express")
const router = express.Router()
const {getAllCreator, getCreatorDetail} = require("../controller/creator");

router.get("/getAllCreator", getAllCreator)
router.get("/getCreatorDetail/:id", getCreatorDetail)

module.exports = router;