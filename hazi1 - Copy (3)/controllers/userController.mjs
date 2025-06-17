import * as User from '../models/user.mjs';

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.getUserByEmail(email);
        
        if (existingUser) {
            return res.status(400).send('Email already registered');
        }

        const userId = await User.createUser(username, email, password);
        const user = { id: userId, username, email };
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server error');
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.getUserByEmail(email);
        
        if (!user || !(await User.validatePassword(user, password))) {
            return res.status(401).send('Invalid credentials');
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        res.redirect('/');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
}

export function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Server error');
        }
        res.redirect('/');
    });
}
