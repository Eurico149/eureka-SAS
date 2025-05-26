import mysql from 'mysql2/promise';


const maria = mysql.createPool({
    host: process.env.DB_HOST ?? 'mariadb',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    user: process.env.MARIA_USER ?? 'user',
    password: process.env.MARIA_PASSWORD ?? 'password',
    database: process.env.MARIA_DB_NAME ?? 'database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export async function testDB(retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            await maria.query('SELECT 1');
            console.log('MariaDB connected!');
            return;
        } catch {
            console.log('Error to connect to MariaDB, retrying...');
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('Database connection failed after multiple attempts');
}

export default maria;
