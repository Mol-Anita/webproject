import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import * as articleController from './controllers/articleController.mjs';
import * as userController from './controllers/userController.mjs';
import * as commentController from './controllers/commentController.mjs';
import * as imageController from './controllers/imageController.mjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Middleware
app.use(express.static(join(__dirname, 'assets')));
app.use('/favicon.ico', express.static(join(__dirname, 'assets', 'images', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Make user data available to all templates
app.use((req, res, next) => {
    res.locals.path = req.path;
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.get('/', articleController.getAllArticles);
app.get('/blog', articleController.getAllArticles);
app.get('/blog/:id', articleController.getArticle);
app.post('/blog', articleController.createArticle);

// Auth routes
app.get('/login', (req, res) => res.render('login'));
app.post('/login', userController.login);
app.get('/register', (req, res) => res.render('register'));
app.post('/register', userController.register);
app.get('/logout', userController.logout);

// Comment routes
app.post('/blog/:articleId/comments', commentController.createComment);

// Image routes
app.post('/blog/:articleId/images', imageController.uploadImage, imageController.handleImageUpload);
app.get('/images/:id', imageController.getImage);
app.delete('/images/:id', imageController.deleteImage);

// Static pages
app.get('/media', (req, res) => {
    res.render('media');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    res.redirect('/contact?success=true');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});