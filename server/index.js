const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const { DBConnection } = require("./database/db.js");
DBConnection();

const contributeRoute = require('./routes/contribute');
app.use('/contribute', contributeRoute);


const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loginRoute = require('./routes/login.js');
app.use('/login', loginRoute);

const signupRoute = require('./routes/signup.js');
app.use('/signup', signupRoute);

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});