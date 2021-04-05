const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    userMongo: process.env.USER_MONGODB,
    passwordMongo: process.env.PASSWORD_MONGODB,
    port: process.env.PORT
};