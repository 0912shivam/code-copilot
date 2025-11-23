const { Sequelize } = require('sequelize');
require('dotenv').config();

async function setupDatabase() {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // Create tables
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS languages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        extension VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS generations (
        id SERIAL PRIMARY KEY,
        prompt TEXT NOT NULL,
        language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        code TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await sequelize.query(`CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS idx_generations_language_id ON generations(language_id);`);

    // Insert languages
    await sequelize.query(`
      INSERT INTO languages (name, extension) VALUES
      ('Python', '.py'),
      ('JavaScript', '.js'),
      ('TypeScript', '.ts'),
      ('C++', '.cpp'),
      ('Java', '.java'),
      ('Go', '.go'),
      ('Rust', '.rs'),
      ('C#', '.cs'),
      ('PHP', '.php'),
      ('Ruby', '.rb')
      ON CONFLICT (name) DO NOTHING;
    `);

    console.log('✅ Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();