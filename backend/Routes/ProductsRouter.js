const ensureAuthenticated = require('../Middlewares/AuthMiddleware');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---',req.body );
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
});

module.exports = router;