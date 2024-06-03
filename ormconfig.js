module.exports = {
    type: "sqlite",
    database: "./data/openjokkh.db",
    synchronize: true,
    logging: false,
    entities: [
      "src/api/entities/**/*.ts"
    ],
    migrations: [
      "src/api/migration/**/*.ts"
    ],
    subscribers: [
      "src/api/subscriber/**/*.ts"
    ]
  };
  