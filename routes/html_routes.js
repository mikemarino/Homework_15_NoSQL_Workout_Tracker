/// state dependencies first

const router = require('express').Router();
const path = require('path');


///html routes necessary -- first route is default/index html

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));


});

/// total duration graph is now working , had to add total duration to the api/workouts/range route 
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});


router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
});

module.exports = router;