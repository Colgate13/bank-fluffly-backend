module.exports = {
  type: 'postgres',
  host: process.env.HOSTDB || 'localhost',
  port: process.env.PORTDB || 5432,
  username: process.env.USERNAME || 'postgres',
  password: process.env.PASS || 'docker',
  database: process.env.DB || 'bank',
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
