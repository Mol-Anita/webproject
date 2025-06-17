import db from '../config/database.mjs';

export async function createComment(articleId, userId, content) {
    const [result] = await db.execute(
        'INSERT INTO comments (article_id, user_id, content) VALUES (?, ?, ?)',
        [articleId, userId, content]
    );
    return result.insertId;
}

export async function getCommentsByArticleId(articleId) {
    const [rows] = await db.execute(
        `SELECT comments.*, users.username 
         FROM comments 
         JOIN users ON comments.user_id = users.id 
         WHERE article_id = ? 
         ORDER BY created_at DESC`,
        [articleId]
    );
    return rows;
}
