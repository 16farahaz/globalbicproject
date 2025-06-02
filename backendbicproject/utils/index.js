
const Jwt = require('jsonwebtoken');

const createJWT = (res, userId) => {
    const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
       
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    });
};

module.exports = {createJWT };
