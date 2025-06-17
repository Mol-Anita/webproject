import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getArticles() {
    const articlesPath = join(__dirname, 'data', 'articles.json');
    const articlesData = readFileSync(articlesPath, 'utf8');
    return JSON.parse(articlesData);
}

export function getArticleById(id) {
    const articles = getArticles();
    return articles.find(article => article.id === id);
}