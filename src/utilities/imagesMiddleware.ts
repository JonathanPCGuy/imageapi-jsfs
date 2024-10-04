import express from 'express';
import { ImageRequest } from '../imageRequest/imageRequest';
import path from 'path';
import url from 'url';
import fs from 'fs';

const resizeRequest = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  let outputDir: string = path.resolve('imageCache');
  let inputDir: string = path.resolve('images');

  const extension: string = '.jpg';

  try {
    let inputFileName = req.query.filename + extension;
    let inputPath: string = path.resolve(inputDir, inputFileName);
    let width: number = Number(req.query.width);
    let height: number = Number(req.query.height);

    let imageRequest: ImageRequest = new ImageRequest(
      inputPath,
      outputDir,
      width,
      height
    );

    res.locals.imageRequest = imageRequest;

    next();
  } catch (err) {
    // going to assume that cutting off is ok and no need to send next
    // not sure if that's best practice long-term
    res.status(400).send('Error with parameters');
  }
};

export default resizeRequest;
