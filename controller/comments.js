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
    const { userId, postId, comId, avatarUrl, userProfile, fullName, text, replies } = req.body;
    console.log(userId, postId, comId, avatarUrl, fullName, text, replies)
    try {
        const newComment = await Comments.create({
            user_id: userId,
            post_id: postId,
            com_id: comId,
            avatarUrl,
            fullName,
            text,
            replies: JSON.stringify(replies),
        });
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add comment' });
    }
}

exports.updateComments = async (req, res) => {
    await Comments.update()
}

exports.deleteComments = async (req, res) => {
    await Comments.destroy()
}