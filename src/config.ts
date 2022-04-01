import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      port: parseInt(process.env.POSTGRES_PORT, 10),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
    },
    mysql: {
      port: parseInt(process.env.MYSQL_PORT, 10),
      database: process.env.MYSQL_DB,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
    },
    port: process.env.PORT,
    apiKey: process.env.API_KEY,
  };
});
