const dbConnection = require('./config/database')();

dbConnection.then(() => {

    require('./main');
}).catch(console.error);

// to run the mongodb in terminal: mongod --config /usr/local/etc/mongod.conf