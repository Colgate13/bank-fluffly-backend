const rootDir = process.env.WHERE;

export default {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ssl: true,
  entities: [
   ['./' + rootDir + '/models/*.{js,ts}'],
  ],
  migrations: [
    ['./' + rootDir + '/database/migrations/*.{js,ts}'],
  ],
  cli: {
    migrationsDir: ['./' +  rootDir + '/database/migrations'],
  },
};
