import express from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Basic route
router.get('/', (req, res) => {
    res.send('Hello from auth service!');
});

router.get('/user', (req, res) => {
    const token = req.cookies;
    const userToken = token;
    console.log(userToken)
    // if (!token) {
    //     // return res.status(401).json({ message: 'Unauthorized' });
    //     // return res.redirect('/auth/login');
    //     return res.send('Unauthorized');
    // }

    // try {
    //     const decoded = jwt.verify(token, 'your_secret_key_here');
    //     const { id, name, email } = decoded;
    //     res.json({ id, name, email });
    // } catch (error) {
    //     return res.status(401).json({ message: 'Invalid token', error });
    // }
    res.send('User page', userToken);
});

// Route to authenticate with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login', (req, res) => {
    res.send('Login page');
});
// Callback route for Google to redirect to
// This uses passport.authenticate middleware to handle the callback from Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/login' }), (req, res, next) => {
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
    res.redirect('/user');
});

// Route to logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err); // Log the error
            return next(err);
        }
        res.redirect('/');
    });
});

export default router;
