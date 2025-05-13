import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

let poolPromise;

const connectToDB = async () => {
    try {
        const pool = await sql.connect(config);
        console.log("Connected to SQL Server...");
        poolPromise = Promise.resolve(pool);
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
};

const getPool = async () => {
    if (!poolPromise) {

        await connectToDB();
    } else {
        try {
            const pool = await poolPromise;
            if (!pool.connected) {
                console.log("Reconnecting to SQL Server...");
                await connectToDB();
            }
        } catch (err) {
            console.error("Error while checking connection status:", err);
            await connectToDB();
        }
    }
    return poolPromise;
};

export { connectToDB, sql, getPool };
