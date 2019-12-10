global.__projectdir = __dirname;

const config = require('./config/config');
const port = config.port;

const dbConnection = require('./config/database')();
const app = require('express')();

dbConnection.then(() => {

    require('./config/express')(app);

    app.listen(port, console.log(`Listening on port ${port}`));

}).catch(console.error);
