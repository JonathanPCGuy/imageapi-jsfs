import sharp, {Sharp} from 'sharp';
import { ImageRequest } from './imageRequest';
import {promises as fs } from 'fs'

const ResizeImage = async(request: ImageRequest) : Promise<boolean> => {

    try
    {
        const readFile = await fs.readFile(request.inputImagePath, {encoding: null});

        // could specify file path directly?
        const buffer = await sharp(request.inputImagePath).resize(request.width, request.height).toBuffer();

        await fs.writeFile(request.outputImagePath, buffer, {flag: 'w'});
    }
    catch(err)
    {
        // log error?
        console.log(err);
        return false;
    }

    return true;

}; 

export default ResizeImage;