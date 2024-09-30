import express from 'express';
import resizeRoute from './resize';

const apiRoutes = express.Router();

apiRoutes.use('resize', resizeRoute);

export default apiRoutes;