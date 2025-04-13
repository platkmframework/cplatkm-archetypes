const mariadb = require('mariadb');

const pool = mariadb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  connectionLimit: 5
});

module.exports = {
  query: async (sql, params) => {
    const conn = await pool.getConnection();
    try {
      return await conn.query(sql, params);
    } finally {
      conn.release();
    }
  },
  getPool: () => pool
};
