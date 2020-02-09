const config = require('./config/config');
const port = config.port;
const express = require('express');
const apiRouter = require('./api')
const cors = require('cors')

const app = express();

//allow our express app to use cors
app.use(cors());

// parse json forms and put all the values inside req.body
app.use(express.json());

// get the api router and use it
app.use('/api', apiRouter);

// json replacer is from express and we use it to extract password from object, that we send to frontend
app.set('json replacer', (key, value) => {

    if (key === 'password') {
        return undefined;
    }
    return value;

});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server error');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});