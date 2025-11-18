import request from "supertest";
import { prisma } from "../database/prisma";

import { app } from "../app";

describe("UsersController", () => {
    let user_id: string;
    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } });
    })
    it("should create a new user sucessfully", async () => {
        const response = await request(app).post("/users").send({
            name: "test",
            email: "testuser@example.com",
            password: "password123"
        });
        expect(response.status).toBe(201);
        expect(response.body.userWhithoutPassword).toHaveProperty("id");
        expect(response.body.userWhithoutPassword.name).toBe("test");

        const user = response.body.userWhithoutPassword
        user_id = user.id
    });

    it("should throw an error if user with same email already exists", async () => {
        const response = await request(app).post("/users").send({
            name: "Duplicate User",
            email: "testuser@example.com",
            password: "password123"
        });
        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Email already in use");
    });

    it("should throw an error if email is invalid", async () => {
        const response = await request(app).post("/users").send({
            name: "Invalid Email User",
            email: "invalid-email",
            password: "password123"
        });
        expect(response.status).toBe(400);
    });
})