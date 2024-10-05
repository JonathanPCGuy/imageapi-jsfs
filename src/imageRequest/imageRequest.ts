// todo: create class to hold all the params for an image request

import * as promisefs from 'fs/promises';
import fs from 'fs';
import ResizeImage from './imageSharpWrapper';
import path from 'path';

class ImageRequest {
  width: number;
  height: number;
  inputImagePath: string;
  fileWithoutExtName: string;
  extension: string;
  outputImagePath: string;
  outputDir: string;

  constructor(
    inputPath: string,
    outputDir: string,
    inputWidth: number,
    inputHeight: number
  ) {
    this.inputImagePath = inputPath;
    this.outputDir = outputDir;
    if (inputWidth <= 0 || inputHeight <= 0) {
      throw new Error('invalid dimension to resize to');
    }

    if (this.DoesInputImageExistSync() === false) {
      throw new Error('input image does not exist.');
    }
    this.width = inputWidth;
    this.height = inputHeight;
    // need to split the file name and combine
    this.extension = path.extname(this.inputImagePath);
    this.fileWithoutExtName = path.basename(
      this.inputImagePath,
      this.extension
    );
    this.outputImagePath = this.GetExpectedFilePath();
  }

  MakeOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }
  }

  GetExpectedFilePath(): string {
    return path.join(
      this.outputDir,
      `${this.fileWithoutExtName}_${this.width}x${this.height}${this.extension}`
    );
  }

  DoesInputImageExistSync(): boolean {
    return fs.existsSync(this.inputImagePath);
  }

  async DoesInputImageExist(): Promise<boolean> {
    try {
      await promisefs.access(this.inputImagePath);
      return true;
    } catch {
      return false;
    }
  }

  async DoesOutputImageExist(): Promise<boolean> {
    try {
      console.log('in output image exist');
      await promisefs.access(this.outputImagePath);
      return true;
    } catch {
      console.log('output image does not exist.');
      return false;
    }
  }

  DoesOutputImageExistSync(): boolean {
    return fs.existsSync(this.outputImagePath);
  }

  async CreateResizedImage(): Promise<boolean> {
    if (!(await this.DoesInputImageExist())) {
      return false;
    }

    // i wish there was a better way to do this
    this.MakeOutputDir();
    return ResizeImage(this);
  }
}

export { ImageRequest };
