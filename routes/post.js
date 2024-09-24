const express = require("express")
const {getComparePostDetail, getPost, getComparePost, getVirtualCastingPost, getPostType, getVirtualCastingPostDetail,
    putVirtualCastingPost
} = require("../controller/post");
const router = express.Router()


router.get("/compare/:id", getComparePostDetail)
router.get("/virtual-casting/:id", getVirtualCastingPostDetail)
router.get("/post-type/:id", getPostType)
router.get("/postList", getPost)
router.get("/compareList", getComparePost)
router.get("/virtual-casting", getVirtualCastingPost)
router.post("/virtual-casting", putVirtualCastingPost)

module.exports = router;