import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import routes from './routes/index.js';

const app = express();

// DB Connection
mongoose.connect('mongodb://localhost')
    .then(() => console.log('Connection established to the DB'))
    .catch(err => console.log('Error on connection to the DB', err));

// MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});

// Register routes
routes(app);

export default app;
