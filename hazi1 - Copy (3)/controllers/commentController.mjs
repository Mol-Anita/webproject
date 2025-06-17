import * as Comment from '../models/comment.mjs';

export async function createComment(req, res) {
    try {
        if (!req.session.user) {
            return res.status(401).send('Unauthorized');
        }

        const { content } = req.body;
        const articleId = req.params.articleId;
        
        await Comment.createComment(articleId, req.session.user.id, content);
        res.redirect(`/blog/${articleId}`);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Server error');
    }
}
