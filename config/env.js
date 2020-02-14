const env = {
  database: "latihan1",
  username: "root",
  password: "handayani17",
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
module.exports = env;
