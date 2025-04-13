const sql = require('mssql');

let pool;

async function getPool() {
  if (!pool) {
    pool = await sql.connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      options: {
        trustServerCertificate: true
      }
    });
  }
  return pool;
}

module.exports = {
  query: async (text) => {
    const conn = await getPool();
    return conn.request().query(text);
  },
  getPool
};
