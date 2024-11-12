import sql from 'mssql';

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    connectTimeout: 30000, 
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true,
      trustServerCertificate: false,
      connectionTimeout: 30000,
      requestTimeout: 30000,
    },
  };
  

let pool;

export const getConnection = async () => {
  if (!pool) {
    pool = await sql.connect(dbConfig);
  }
  return pool;
};