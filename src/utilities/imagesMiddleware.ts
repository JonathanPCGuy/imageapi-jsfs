import express from 'express';
import { NextFunction } from 'express';
import { ImageRequest } from '../imageRequest/imageRequest';
import path from 'path';

const resizeRequest = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const outputDir: string = path.resolve('imageCache');
  const inputDir: string = path.resolve('images');

  const extension: string = '.jpg';

  try {
    const inputFileName = req.query.filename + extension;
    const inputPath: string = path.resolve(inputDir, inputFileName);
    const width: number = Number(req.query.width);
    const height: number = Number(req.query.height);

    const imageRequest: ImageRequest = new ImageRequest(
      inputPath,
      outputDir,
      width,
      height
    );

    res.locals.imageRequest = imageRequest;

    next();
  } catch {
    // going to assume that cutting off is ok and no need to send next
    // not sure if that's best practice long-term
    res.status(400).send('Error with parameters');
  }
};

export default resizeRequest;
