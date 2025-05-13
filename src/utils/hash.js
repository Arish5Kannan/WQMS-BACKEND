import bcrypt from 'bcrypt';

const saltRounds = 10;

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
    // return await password === hash ;
}

export { hashPassword, comparePassword };
