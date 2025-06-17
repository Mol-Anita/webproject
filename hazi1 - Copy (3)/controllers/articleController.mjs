import * as Article from '../models/article.mjs';
import * as Comment from '../models/comment.mjs';

export async function getAllArticles(req, res) {
    try {
        let articles;
        if (req.query.search) {
            articles = await Article.searchArticles(req.query.search);
        } else {
            articles = await Article.getAllArticles();
        }

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            // Ha AJAX kérés, JSON választ küldünk
            res.json({ articles });
        } else {
            // Normál oldalbetöltésnél teljes oldalt renderelünk
            res.render('blog', { 
                articles,
                user: req.session.user,
                searchQuery: req.query.search || '' 
            });
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(500).json({ error: 'Server error' });
        } else {
            res.status(500).send('Server error');
        }
    }
}

export async function getArticle(req, res) {    try {
        const articleId = parseInt(req.params.id, 10);
        if (isNaN(articleId)) {
            return res.status(400).send('Invalid article ID');
        }

        const article = await Article.getArticleById(articleId);
        if (!article) {
            return res.status(404).send('Article not found');
        }

        const comments = await Comment.getCommentsByArticleId(articleId);
        res.render('blog', { 
            article, 
            comments,
            user: req.session.user 
        });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).send('Server error');
    }
}

export async function createArticle(req, res) {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.redirect('/blog?error=missing_fields');
        }

        await Article.createArticle(title, content, req.session.user.id);
        res.redirect('/blog');
    } catch (error) {
        console.error('Error creating article:', error);
        res.redirect('/blog?error=server_error');
    }
}
