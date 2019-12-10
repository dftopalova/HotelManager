const bodyParser = require('body-parser');

// TODO: add cors and cookies middlewares

module.exports = (app) => {

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());
};