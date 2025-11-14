import { env } from "@/env";

export const authConfig = {
    jwt: {
        jwtSecret: env.JWT_SECRET,
        tokenExpiration: '1h',

    }
};