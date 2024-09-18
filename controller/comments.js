const { Comments  } = require('../models');

exports.getComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comments.findAll({ where: { post_id: postId } });
        res.json(comments.map(comment => comment.toJSON()));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
}

exports.addComments = async (req, res) => {
    const { userId, post_Id, avatarUrl, userProfile, fullName, text, replies } = req.body;
    console.log(userId, post_Id, avatarUrl, userProfile, fullName, text, replies)
    try {
        const newComment = await Comments.create({
            user_id: userId,
            post_id: post_Id,
            avatarUrl,
            userProfile,
            fullName,
            text,
            replies: JSON.stringify(replies), // 배열을 문자열로 변환하여 저장
        });
        res.status(201).json(newComment); // 생성된 댓글을 반환
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add comment' });
    }
}