import jasmine from 'jasmine';
import supertest from 'supertest';
import app from '../../../index';
import path from 'path';
import fs from 'fs';

// do i always import app? possible to import a route specifically?
const request = supertest(app);

describe('Testing the /api/images endpoint', () => {
  let targetImage: string = path.resolve('images/fjord.jpg');
  let expectedOutputImagePath: string = path.resolve(
    'imageCache/fjord_200x150.jpg'
  );

  beforeAll(function () {
    console.info(targetImage);
    if (fs.existsSync(expectedOutputImagePath) === true) {
      fs.unlinkSync(expectedOutputImagePath);
    }
  });

  it('base api endpoint should return 200', async () => {
    const response = await request.get('/api');
    expect(response.statusCode).withContext('should return 200').toBe(200);
  });

  it('valid request should return 200', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.statusCode)
      .withContext('valid request should return 200')
      .toBe(200);
  });

  it('invalid request (missing file) should return 400', async () => {
    const response = await request.get(
      '/api/images?filename=doesnotexist&width=200&height=200'
    );
    expect(response.statusCode)
      .withContext('invalid request should return 400')
      .toBe(400);
  });

  it('invalid request (missing params) should return 400', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200');
    expect(response.statusCode)
      .withContext('invalid request should return 400')
      .toBe(400);
  });

  it('invalid request (bad params) should return 400', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=-5&height=a'
    );
    expect(response.statusCode)
      .withContext('invalid request should return 400')
      .toBe(400);
  });
});
