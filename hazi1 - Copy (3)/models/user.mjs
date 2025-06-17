import db from '../config/database.mjs';
import bcrypt from 'bcrypt';

export async function createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return result.lastID;
}

export async function getUserByEmail(email) {
    return await db.get('SELECT * FROM users WHERE email = ?', [email]);
}

export async function validatePassword(user, password) {
    return await bcrypt.compare(password, user.password);
}
