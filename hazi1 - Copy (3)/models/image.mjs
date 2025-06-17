import db from '../config/database.mjs';

export async function createImage(imageData, articleId) {
    const { filename, originalname, mimetype, size } = imageData;
    const [result] = await db.execute(
        'INSERT INTO images (filename, originalname, mimetype, size, article_id) VALUES (?, ?, ?, ?, ?)',
        [filename, originalname, mimetype, size, articleId]
    );
    return result.insertId;
}

export async function getImagesByArticleId(articleId) {
    const [rows] = await db.execute('SELECT * FROM images WHERE article_id = ?', [articleId]);
    return rows;
}

export async function deleteImage(id) {
    const [result] = await db.execute('DELETE FROM images WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

export async function getImageById(id) {
    const [rows] = await db.execute('SELECT * FROM images WHERE id = ?', [id]);
    return rows[0] || null;
}
