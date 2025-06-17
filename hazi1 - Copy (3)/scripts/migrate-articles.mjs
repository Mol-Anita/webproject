import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from '../config/database.mjs';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrateArticles() {
    try {
        // Read the JSON file
        const articlesJson = readFileSync(join(__dirname, '..', 'data', 'articles.json'), 'utf8');
        const articles = JSON.parse(articlesJson);

        // Hash password for admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create a default user for existing articles if not exists
        try {
            await db.run(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                ['admin', 'admin@example.com', hashedPassword]
            );
        } catch (e) {
            // User might already exist, continue
        }
        
        const user = await db.get('SELECT id FROM users WHERE email = ?', ['admin@example.com']);
        const userId = user.id;

        // Insert each article
        for (const article of articles) {
            const content = Array.isArray(article.content) ? article.content.join('\n\n') : article.content;
            
            await db.run(
                'INSERT INTO articles (title, content, user_id, created_at) VALUES (?, ?, ?, ?)',
                [article.title, content, userId, new Date(article.date)]
            );

            // Get the article id
            const result = await db.get('SELECT last_insert_rowid() as id');
            const articleId = result.id;

            // If article has an image, add it to images table
            if (article.image) {
                const imagePath = article.image.split('/').pop(); // Get filename from path
                await db.run(
                    'INSERT INTO images (filename, originalname, mimetype, size, article_id) VALUES (?, ?, ?, ?, ?)',
                    [imagePath, imagePath, 'image/jpeg', 0, articleId]
                );
            }
        }

        console.log('Articles migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    }
}

migrateArticles();
