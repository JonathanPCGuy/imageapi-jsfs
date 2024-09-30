import express from 'express';
import resizeRequest from '../../utilities/resize';

const resizeRoute = express.Router();

resizeRoute.use(resizeRequest);

resizeRoute.get('/', async (req, res) => {
    // the middleware should make
    try
    {
        let imageRequest = res.locals.imageRequest;

        if(await !imageRequest.DoesInputImageExist())
        {
            res.status(400).send('Input image does not exist');
        }
    
        if(await !imageRequest.DoesOutputImageExist() && await !imageRequest.CreateResizedImage())
        {
            res.status(400).send('Unable to create resized image');
        }
    }
    catch(err)
    {
        // possible to better serve more targeted codes?
        res.status(400).send('Unable to serve resized image');
    }
});

export default resizeRoute;