import mysql from "mysql2/promise"
export default async  function connection() {
    try {
        const dbconnection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        })
        return dbconnection;
    } catch (err) {
        throw err;
    }

}