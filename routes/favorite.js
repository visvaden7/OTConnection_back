const express = require("express")
const router = express.Router()
const {addFavorite, deleteFavorite, checkFavorite, getFavorite} = require("../controller/favorite")


router.post("/", addFavorite)

router.delete("/", deleteFavorite)

router.get("/check_favorite",checkFavorite)

router.get("/get_favorite", getFavorite)

module.exports = router