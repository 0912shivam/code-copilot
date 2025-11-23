const { Sequelize } = require('sequelize');

// Parse DATABASE_URL or use default PostgreSQL connection
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/code_copilot';

// Detect database dialect from URL
let dialect = 'postgres'; // Default to PostgreSQL
if (databaseUrl.includes('postgresql') || databaseUrl.includes('postgres')) {
  dialect = 'postgres';
} else if (databaseUrl.includes('mysql')) {
  dialect = 'mysql';
} else if (databaseUrl.includes('sqlite')) {
  dialect = 'sqlite';
}

// Create Sequelize instance
const sequelize = new Sequelize(databaseUrl, {
  dialect: dialect,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: dialect === 'postgres' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

module.exports = { sequelize };
