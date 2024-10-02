import jasmine from 'jasmine';
import supertest from 'supertest';
import app from '../../../index';

// do i always import app? possible to import a route specifically?
const request = supertest(app);

describe("Endpoint testing - spec", () => {

    it('base api endpoint should return 200', async() => {
        const response = await request.get('/api');
        expect(response.statusCode).withContext('should return 200').toBe(200);
    });

    it('valid request should return 200', async() => {
        const response = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(response.statusCode).withContext('valid request should return 200').toBe(200);
    });

    // it('invalid request (missing file) should return 400', async(done) => {

    // });
});