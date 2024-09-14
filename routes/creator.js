const express = require("express")
const {getAllCreator, getCreatorDetail} = require("../controller/creator");
const router = express.Router()

router.get("/getAllCreator", getAllCreator)
router.get("/getCreatorDetail/:id", getCreatorDetail)

module.exports = router;