console.log(`process.env.DATABASE = ${process.env.DATABASE}`);
console.log(`process.env.ENTITIES = ${process.env.ENTITIES}`);
console.log(`process.env.MIGRATIONS = ${process.env.MIGRATIONS}`);
console.log(`process.env.CLIMIGRATIONSDIR = ${process.env.CLIMIGRATIONSDIR}`);

module.exports = {
  "type": "sqlite",
  "database": process.env.DATABASE,
  "entities": [
     process.env.ENTITIES,
  ],
  "migrations": [
     process.env.MIGRATIONS
  ],
  "cli": {
      "migrationsDir": process.env.CLIMIGRATIONSDIR
  }
}
