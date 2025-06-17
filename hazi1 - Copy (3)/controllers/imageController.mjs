import multer from 'multer';
import path from 'path';
import * as Image from '../models/image.mjs';

// Multer konfiguráció
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

export const uploadImage = upload.single('image');

export async function handleImageUpload(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const articleId = req.params.articleId;
        const imageId = await Image.createImage(req.file, articleId);

        // Ha AJAX kérés, JSON választ küldünk
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.json({
                success: true,
                imageId: imageId,
                filename: req.file.filename
            });
        } else {
            // Egyébként visszairányítjuk a cikk oldalára
            res.redirect(`/blog/${articleId}`);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Server error');
    }
}

export async function getImage(req, res) {
    try {
        const image = await Image.getImageById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.sendFile(path.join(process.cwd(), 'assets/uploads/', image.filename));
    } catch (error) {
        console.error('Error getting image:', error);
        res.status(500).send('Server error');
    }
}

export async function deleteImage(req, res) {
    try {
        const success = await Image.deleteImage(req.params.id);
        if (!success) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
