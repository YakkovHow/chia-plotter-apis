var express = require('express');
var router = express.Router();

router.get('/sping', (req, res) => {
    res.send('Message received by plotter port 8443');
})

module.exports = router;