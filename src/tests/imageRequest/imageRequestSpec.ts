import { ImageRequest } from '../../imageRequest/imageRequest';
import fs from 'fs';
import path from 'path';

describe('Image request class', function () {
  // output location may need to be adjusted, especially for testing
  // for some reason relative path did not work, had to make it absolute path
  let targetImage: string = path.resolve('images/fjord.jpg');
  let outputDir: string = path.resolve('imageCache');
  let expectedOutputImagePath: string = path.resolve(
    'imageCache/fjord_200x150.jpg'
  );
  let sharedRequest: ImageRequest = new ImageRequest(
    targetImage,
    outputDir,
    200,
    150
  );
  //let inputPath = "test.jpg";
  beforeAll(function () {
    console.info(targetImage);
    if (fs.existsSync(expectedOutputImagePath)) {
      console.info('removing existing file');
      fs.unlinkSync(expectedOutputImagePath);
    }
  });

  it('should generate the expected file name', () => {
    expect(
      sharedRequest.GetExpectedFilePath().endsWith('fjord_200x150.jpg')
    ).toBeTrue();
  });

  it('image should exist', async () => {
    console.log('Current directory:', __dirname);
    expect(await sharedRequest.DoesInputImageExist()).toBeTrue();
  });

  // need to set up to always run?
  it('should create the image', async () => {
    console.info(sharedRequest.GetExpectedFilePath());
    expect(fs.existsSync(sharedRequest.GetExpectedFilePath()))
      .withContext('file should not be present before creation')
      .toBeFalse(); // is there a way to pass in custom error messages
    const creationResult = await sharedRequest.CreateResizedImage();
    // todo: better logging
    expect(creationResult)
      .withContext('file should have been created with no error')
      .toBeTrue();
    expect(await sharedRequest.DoesOutputImageExist())
      .withContext('output file should be in expected location')
      .toBeTrue();
  });

  describe('should error when invalid input is provided', async () => {
    it("when image doesn't exist", async () => {
      let targetImage: string = path.resolve('images/doesnotexist.jpg');
      let outputDir: string = path.resolve('imageCache');
      try {
        let imgRequest = new ImageRequest(targetImage, outputDir, 200, 200);
        fail(
          'trying to create instance of ImageRequest with a non existent input image should have thrown an error'
        );
      } catch {}
    });

    it('when new size values are invalid', async () => {
      let targetImage: string = path.resolve('images/fjord.jpg');
      let outputDir: string = path.resolve('imageCache');
      try {
        let imgRequest = new ImageRequest(targetImage, outputDir, -5, 0);
        fail(
          'trying to create instance of image class should have thrown an error'
        );
      } catch {}
    });
  });
});
