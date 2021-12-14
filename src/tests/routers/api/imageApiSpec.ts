import supertest from 'supertest';
import app from '../../../index';
import fs from "fs"

const request = supertest(app);
describe('Test for /api/image ', () => {
    describe("Test error handling" , ()=> {
        it('Test when image name is wrong', async () => {
            const response = await request.get('/api/images?hight=805&width=705&filename=wrongName');
            expect(response.status).toBe(400);
        });
        it('Test when one url args missing', async () => {
            const response = await request.get('/api/images?&width=705&filename=wrongName');
            expect(response.status).toBe(400);
        });
        it('Test when all url args are missing', async () => {
            const response = await request.get('/api/images');
            expect(response.status).toBe(400);
        });
    })
    describe("Test with wright args", () => {
            it('Get test to "/api/image" with right args', async () => {
                const response = await request.get('/api/images?hight=805&width=705&filename=fjord');
                expect(response.status).toBe(200);        
            });
            it('Test if image resized have created', async () => {
                await request.get('/api/images?hight=805&width=805&filename=fjord');
                expect(fs.existsSync(`./assets/thump/fjord-805_805.jpg`)).toBe(true);
            });
    })
});