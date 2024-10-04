import express from 'express';
import images from './images';

const apiRoutes = express.Router();

apiRoutes.use('/images', images);

apiRoutes.get('/', (req, res) => {
    res.send('{"notice":"visit /images with params to be able to request a resized imageaa."}');
});

export default apiRoutes;