import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'

import routes from './routes/routes.js';


const app = express();

// Middleware
app.use(bodyParser.json( { limit: "30mb", extended: true } ));
app.use(bodyParser.urlencoded( { limit: "30mb", extended: true } ));
app.use(cors());

// Route(s) --- edit later
app.use('/', routes);


// Mongoose Variables
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);


// Connecting to DB + Running Server
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true })
    .then( () =>  app.listen(PORT, () => console.log(`Listening on Port ${PORT}`)))
    .catch( (err) => console.log(err) );