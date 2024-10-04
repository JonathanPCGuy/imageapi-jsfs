import express from 'express';
import resizeRequest from '../../utilities/imagesMiddleware';
import { ImageRequest } from '../../imageRequest/imageRequest';

const resizeRoute = express.Router();

resizeRoute.use(resizeRequest);

resizeRoute.get('/', async (req, res) => {
  // the middleware should make
  try {
    const imageRequest: ImageRequest = res.locals.imageRequest;

    if (!imageRequest.DoesInputImageExist()) {
      res.status(400).send('Input image does not exist');
    }
    console.info('checking for or creating output image');
    //if(!(imageRequest.DoesOutputImageExist()) && !(imageRequest.CreateResizedImage()))
    if (!(await imageRequest.DoesOutputImageExist())) {
      console.info('creating image since it is not present.');
      if (!(await imageRequest.CreateResizedImage())) {
        res.status(400).send('Unable to create or use existing resized image');
      }
    }

    res.sendFile(imageRequest.GetExpectedFilePath());
  } catch {
    // possible to better serve more targeted codes?
    res.status(400).send('Unable to serve resized image');
  }
});

export default resizeRoute;
