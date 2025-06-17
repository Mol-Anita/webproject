import db from '../config/database.mjs';
import bcrypt from 'bcrypt';

export async function createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return result.insertId;
}

export async function getUserByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
}

export async function validatePassword(user, password) {
    return await bcrypt.compare(password, user.password);
}
