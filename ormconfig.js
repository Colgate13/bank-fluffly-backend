export default {
  type: process.env.TYPEDB,
  host: process.env.HOSTDB,
  port: process.env.PORTDB,
  username: process.env.USERNAME,
  password: process.env.PASS,
  database: process.env.DB,
  entities: [
    './src/models/*.ts',
  ],
  migrations: [
    './src/database/migrations/*.ts',
  ],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
