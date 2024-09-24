const express = require("express")
const {getComparePostDetail, getPost, getComparePost, getVirtualCastingPost, getPostType, getVirtualCastingPostDetail,
    putVirtualCastingPost
} = require("../controller/post");
const router = express.Router()


router.get("/compare/:id", getComparePostDetail)
router.get("/virtual-casting/:id", getVirtualCastingPostDetail)
router.get("/post-type/:id", getPostType) //포스트 타입을 통한 포스트 컨텐츠 선택
router.get("/postList", getPost)
router.get("/compareList", getComparePost)
router.get("/virtual-casting", getVirtualCastingPost)
router.post("/virtual-casting", putVirtualCastingPost)

module.exports = router;