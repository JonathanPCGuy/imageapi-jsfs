import {ImageRequest} from "../../imageRequest/imageRequest";
import fs from 'fs'
import path from 'path'

describe("Image request class", function() {
    
    // output location may need to be adjusted, especially for testing
    let targetImage = path.join(__dirname, '../../../images/fjord.jpg');
    let expectedOutputImagePath = "../../../images/fjord_200x150.jpg";
    let sharedRequest = new ImageRequest(targetImage, 200, 150);
    //let inputPath = "test.jpg";
    beforeAll(function() {
        if(fs.existsSync(expectedOutputImagePath))
        {
            fs.unlinkSync('../../../images/fjord_200x150.jpg');
        }
    });
    
    it("should generate the expected file name", () => {
        expect(sharedRequest.GetExpectedFilePath().endsWith('fjord_200x150.jpg')).toBeTrue();
    });

    it('image should exist', () => {
        console.log("Current directory:", __dirname);
        expect(sharedRequest.DoesInputImageExist()).toBeTrue();
    });

    // need to set up to always run?
    it ("should create the image", async ()  =>{
        console.log(sharedRequest.GetExpectedFilePath());
        expect(fs.existsSync(sharedRequest.GetExpectedFilePath())).toBeFalse(); // is there a way to pass in custom error messages
        const creationResult = await sharedRequest.CreateResizedImage();
        // todo: better logging
        expect(creationResult).toBeTrue();
        expect(sharedRequest.DoesOutputImageExist()).toBeTrue();
    });


});