import db from '../config/database.mjs';

export async function getAllArticles() {
    const [rows] = await db.execute(`
        SELECT articles.*, users.username 
        FROM articles 
        LEFT JOIN users ON articles.user_id = users.id 
        ORDER BY created_at DESC
    `);
    return rows;
}

export async function searchArticles(query) {
    const [rows] = await db.execute(`
        SELECT articles.*, users.username 
        FROM articles 
        LEFT JOIN users ON articles.user_id = users.id 
        WHERE articles.title LIKE ? OR articles.content LIKE ?
        ORDER BY created_at DESC
    `, [`%${query}%`, `%${query}%`]);
    return rows;
}

export async function getArticleById(id) {
    const [rows] = await db.execute(`
        SELECT articles.*, users.username 
        FROM articles 
        LEFT JOIN users ON articles.user_id = users.id 
        WHERE articles.id = ?
    `, [id]);

    const article = rows[0] || null;

    if (article) {
        // Get images for the article
        const [imageRows] = await db.execute('SELECT * FROM images WHERE article_id = ?', [id]);
        article.images = imageRows;
    }

    return article;
}

export async function createArticle(title, content, userId) {
    const [result] = await db.execute(
        'INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)',
        [title, content, userId]
    );
    return result.insertId;
}

export async function updateArticle(id, title, content) {
    const [result] = await db.execute(
        'UPDATE articles SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );
    return result.affectedRows > 0;
}

export async function deleteArticle(id) {
    const [result] = await db.execute('DELETE FROM articles WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
