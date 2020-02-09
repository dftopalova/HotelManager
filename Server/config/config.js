const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: 8080,
        dbURL: 'mongodb://localhost:27017/hotel-manager'
    },
    production: {}
};

module.exports = config[env];