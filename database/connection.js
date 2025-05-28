const mysql = require('mysql2/promise');

const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME} = require('../config/config')

// Create connection pool
const pool = mysql.createPool({
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_PASSWORD || '',
  database: DB_NAME || 'school_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: true }
});

// Test connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  testConnection
};