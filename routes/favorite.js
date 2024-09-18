const express = require("express")
const router = express.Router()
const {addFavorite, deleteFavorite, checkFavorite} = require("../controller/favorite")


router.post("/", addFavorite)

router.delete("/", deleteFavorite)

router.get("/check_favorite/:id",checkFavorite)

module.exports = router