const jwt = require("jsonwebtoken");

const SECRET_KEY = "Mayandi$@2002"; // Replace with a strong secret or use env vars

module.exports = {
    generateToken: (userData) => {
        return jwt.sign(userData, SECRET_KEY, { expiresIn: "2h" });
    },

    verifyToken: (token) => {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return null;
        }
    }
};
