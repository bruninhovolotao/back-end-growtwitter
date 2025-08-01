import dotenv from 'dotenv';

dotenv.config();

export const envs = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BCRYPT_SALT: Number(process.env.BCRYPT_SALT),
}