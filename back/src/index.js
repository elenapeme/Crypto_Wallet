const express = require('express');
const routes = require("./routes/routes");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");

const { userMongo, passwordMongo, port } = require("../config/config");

const app = express();

// Connect to DB and opens port
(async () => {
    try {
        const uri = `mongodb+srv://${userMongo}:${passwordMongo}@cluster0.4lox7.mongodb.net/crypto_wallet_db?retryWrites=true&w=majority`;
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.use(function(req, res, next) {
            if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
              jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
                if (err) req.user = undefined;
                req.user = decode;
                next();
              });
            } else {
              req.user = undefined;
              next();
            }
        });

        app.use("/api", routes);
        
        app.listen(port, () => console.log(`App listening on port ${port}!`));
    } catch (e) {
        console.log(e);
    }
    
})();



