const dbConnection = require('./config/database')();

dbConnection.then(() => {

    require('./main');
}).catch(console.error);
