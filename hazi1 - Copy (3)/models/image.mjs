import db from '../config/database.mjs';

export async function createImage(imageData, articleId) {
    const { filename, originalname, mimetype, size } = imageData;
    const result = await db.run(
        'INSERT INTO images (filename, originalname, mimetype, size, article_id) VALUES (?, ?, ?, ?, ?)',
        [filename, originalname, mimetype, size, articleId]
    );
    return result.lastID;
}

export async function getImagesByArticleId(articleId) {
    return await db.all('SELECT * FROM images WHERE article_id = ?', [articleId]);
}

export async function deleteImage(id) {
    const result = await db.run('DELETE FROM images WHERE id = ?', [id]);
    return result.changes > 0;
}

export async function getImageById(id) {
    return await db.get('SELECT * FROM images WHERE id = ?', [id]);
}
