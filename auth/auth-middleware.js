const jwt = require("jsonwebtoken");

const constants = require("../config/constants.js");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    const secret = constants.jwtSecret;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({message: 'Invalid Token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "You must be logged in to access this data" });
    }
};
