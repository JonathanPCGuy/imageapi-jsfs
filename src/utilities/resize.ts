import express from 'express';
import { ImageRequest } from '../imageRequest/imageRequest';
import path from 'path';
import url from 'url';
import fs from 'fs'

const resizeRequest = async(req: express.Request, res: express.Response, next: Function) =>
{
    let imageName = path.basename(req.baseUrl);
    let inputImage : string = path.join('images', imageName);
    inputImage = path.resolve(inputImage);
    let outputDir : string = path.resolve('imageCache');

    try
    {
        let width: number = Number(req.params['width']);
        let height: number = Number(req.params['height']);

        let imageRequest : ImageRequest = new ImageRequest(inputImage, outputDir, width, height);


        res.locals.imageRequest = imageRequest;

        next();
    }
    catch(err)
    {
        // going to assume that cutting off is ok and no need to send next
        // not sure if that's best practice long-term
        res.status(400).send('Error with parameters');
    }

    
}

export default resizeRequest;