// todo: create class to hold all the params for an image request

import fs from 'fs';
import ResizeImage from './ImageModifierHelper';

class ImageRequest {
    width: number;
    height: number;
    inputImagePath: string;
    fileName: string;
    extension:string;
    outputImagePath: string;

    constructor(inputPath: string, inputWidth: number, inputHeight: number)
    {
        this.inputImagePath = inputPath;
        this.width = inputWidth;
        this.height = inputHeight;
        this.fileName = this.inputImagePath.substring(0, this.inputImagePath.lastIndexOf('.'));
        this.extension = this.inputImagePath.substring(this.inputImagePath.lastIndexOf('.')+1); // corner case
        this.outputImagePath = this.GetExpectedFilePath();
    }

    GetExpectedFilePath(): string {
        
        return `${this.fileName}_${this.width}x${this.height}.${this.extension}`;
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