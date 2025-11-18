import request from 'supertest';

import { prisma } from '../database/prisma';
import { app } from '../app';


describe('SessionsController', () => {
    let user_id: string;

     afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } });
    })
    it('should authenticate a and get access token', async () => {
        const response = await request(app).post("/users").send({
            name: "Auth Test User",
            email: "Auth_Test_User@example.com",
            password: "password123"
        })
        const user = response.body.userWhithoutPassword
        user_id = user.id

        const authResponse = await request(app).post('/sessions').send({
            email: "Auth_Test_User@example.com",
            password: "password123"
        })



        expect(authResponse.status).toBe(200);
        expect(authResponse.body.token).toEqual(expect.any(String));
    });
})