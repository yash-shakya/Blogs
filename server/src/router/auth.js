import express from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// check if user is authenticated
router.get('/user', (req, res) => {
    const token = req.headers.cookie.split('token=')[1].split(';')[0];

    if (!token) {
        // return res.status(401).json({ message: 'Unauthorized' });
        // return res.redirect('/auth/login');
        return res.send('Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key_here');
        const { id, name, email, role } = decoded;
        res.json({ id, name, email, role });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error });
    }
    res.send('Not authenticated');
});

// Route to authenticate with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/error', (req, res) => {
    res.send('Something went wrong. Please try again.');
});

// Callback route for Google to redirect to
// This uses passport.authenticate middleware to handle the callback from Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/error' }), (req, res, next) => {
    if (req.authError) {
        console.log(req.authError); // Log the error
        return next(req.authError);
    }
    // Generate JWT token with user information
    const token = jwt.sign({
        name: req.user.name || req.user.gAuth.displayName,
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
    }, 'your_secret_key_here');

    // Send the JWT token as a response
    res.cookie('token', token);
    res.redirect('/auth/user');
});

// Route to logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('connect.sid');
    res.redirect('/');
});

export default router;
