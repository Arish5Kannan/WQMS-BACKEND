import { getPool } from "../config/db.js";

let pool;

(async () => {
    try {
        pool = await getPool();
    } catch (err) {
        console.error('Error while getting pool in equipment category controller', err);
    }
})();

async function getUserByUsername(username) {
    try {

        const request = pool.request();
        request.input('username', username);
        const result = await request.query('SELECT * FROM tbl_user WHERE username = @username');

        return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
        throw new Error(`Database error: ${error.message}`);
    }
}

export default { getUserByUsername };
