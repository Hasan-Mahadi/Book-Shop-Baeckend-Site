import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  // default_password: process.env.DEFAULT_PASS,
  // jwt_access_secret: process.env.JWT_ACCESS_SECRET
  client_url: process.env.CLIENT_URL,

  sp: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_username: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url:
      process.env.SP_RETURN_URL || `${process.env.CLIENT_URL}payment-success`,
  },
};
