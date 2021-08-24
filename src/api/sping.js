import express from 'express';
const router = express.Router();

router.get('/sping', (req, res) => {
    res.send('Message received by plotter port 8443');
})
export default router;