import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1121',
    database: process.env.DB_NAME || 'blog_db'
});

export default db;
