// todo: create class to hold all the params for an image request

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

    DoesInputImageExist(): boolean {
        return fs.existsSync(this.inputImagePath);
    }

    DoesOutputImageExist(): boolean {
        return fs.existsSync(this.outputImagePath);
    }

    async CreateResizedImage(): Promise<boolean> {
        if(this.DoesInputImageExist() == false)
        {
            return false;
        }
        return ResizeImage(this);
    }
}

export {ImageRequest};