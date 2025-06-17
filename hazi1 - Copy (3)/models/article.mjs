import db from '../config/database.mjs';

export async function getAllArticles() {
    return await db.all(`
        SELECT articles.*, users.username 
        FROM articles 
        LEFT JOIN users ON articles.user_id = users.id 
        ORDER BY created_at DESC
    `);
}

export async function searchArticles(query) {
    return await db.all(`
        SELECT articles.*, users.username 
        FROM articles 
        LEFT JOIN users ON articles.user_id = users.id 
        WHERE articles.title LIKE ? OR articles.content LIKE ?
        ORDER BY created_at DESC
    `, [`%${query}%`, `%${query}%`]);
}

export async function getArticleById(id) {
    const article = await db.get(`
        SELECT articles.*, users.username 
        FROM articles 
        LEFT JOIN users ON articles.user_id = users.id 
        WHERE articles.id = ?
    `, [id]);

    if (article) {
        // Get images for the article
        article.images = await db.all('SELECT * FROM images WHERE article_id = ?', [id]);
    }

    return article;
}

export async function createArticle(title, content, userId) {
    const result = await db.run(
        'INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)',
        [title, content, userId]
    );
    return result.lastID;
}

export async function updateArticle(id, title, content) {
    const result = await db.run(
        'UPDATE articles SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );
    return result.changes > 0;
}

export async function deleteArticle(id) {
    const result = await db.run('DELETE FROM articles WHERE id = ?', [id]);
    return result.changes > 0;
}
