const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');

app.use(cors({
  origin: 'http://54.80.126.183:5173',
  credentials: true
}));

const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { DBConnection } = require("./database/db.js");
DBConnection();

const contributeRoute = require('./routes/contribute');
app.use('/contribute', contributeRoute);

const loginRoute = require('./routes/login.js');
app.use('/login', loginRoute);

const signupRoute = require('./routes/signup.js');
app.use('/signup', signupRoute);

const practiceRoute = require('./routes/practice.js');
app.use('/practice', practiceRoute);

const problemRoute = require('./routes/problem.js');
app.use('/problems', problemRoute);

const submitRoute = require('./routes/submit.js');
app.use('/submit', submitRoute);

const profileRoute = require('./routes/profile.js');
app.use('/profile', profileRoute);

const AI_Review_Route = require('./routes/AI_Review.js');
app.use('/ai-review', AI_Review_Route);

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});