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
    const { comId } = req.params; // URL 파라미터에서 comId 추출
    console.log(comId)
    const { text, replies } = req.body; // 수정할 데이터 (본문 및 답글) 요청 바디에서 추출

    try {
        const comment = await Comments.findOne({ where: { com_id: comId } });

        // 댓글 업데이트
        await comment.update({
            text: text || comment.text, // 새로운 텍스트가 없으면 기존 텍스트 유지
            replies: JSON.stringify(replies) || comment.replies, // 새로운 답글이 없으면 기존 답글 유지
        });

        res.status(200).json(comment); // 업데이트된 댓글 반환
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update comment' });
    }
}

exports.deleteComments = async (req, res) => {
    const { comId } = req.params; // URL 파라미터에서 comId 추출

    try {
        const comment = await Comments.findOne({ where: { com_id: comId } });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // 댓글 삭제
        await Comments.destroy({ where: { com_id: comId } });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
}