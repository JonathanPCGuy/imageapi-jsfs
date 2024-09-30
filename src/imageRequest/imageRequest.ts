// todo: create class to hold all the params for an image request

import * as promisefs from 'fs/promises';
import fs from 'fs';
import ResizeImage from './ImageModifierHelper';
import path from 'path';

class ImageRequest {
    width: number;
    height: number;
    inputImagePath: string;
    fileWithoutExtName: string;
    extension:string;
    outputImagePath: string;
    outputDir: string;

    constructor(inputPath: string, outputDir:string, inputWidth: number, inputHeight: number)
    {
        this.inputImagePath = inputPath;
        this.outputDir = outputDir;
        if(inputWidth <=0 || inputHeight <= 0)
        {
            throw new Error('invalid dimension to resize to');
        }
        this.width = inputWidth;
        this.height = inputHeight;
        // need to split the file name and combine
        this.extension = path.extname(this.inputImagePath);
        this.fileWithoutExtName = path.basename(this.inputImagePath, this.extension);
        this.outputImagePath = this.GetExpectedFilePath();
    }

    GetExpectedFilePath(): string {
        
        return path.join(this.outputDir,`${this.fileWithoutExtName}_${this.width}x${this.height}${this.extension}`);
    }

    DoesInputImageExistSync(): boolean {
        return fs.existsSync(this.inputImagePath);
    }

    async DoesInputImageExist(): Promise<boolean> {
        try{
            await promisefs.access(this.inputImagePath);
            return true;
        }
        catch{
            return false;
        }
    }

    async DoesOutputImageExist(): Promise<boolean> {
        try{
            await promisefs.access(this.outputImagePath);
            return true;
        }
        catch{
            return false;
        }
    }

    DoesOutputImageExistSync(): boolean {
        return fs.existsSync(this.outputImagePath);
    }

    async CreateResizedImage(): Promise<boolean> {
        if(this.DoesInputImageExistSync() == false)
        {
            return false;
        }
        return ResizeImage(this);
    }
}

export {ImageRequest};