require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// IMPORT ROUTES
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


// APP MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
if ((process.env.NODE_ENV = 'development')) {
    app.use(cors({ origin: 'http://localhost:3000' }));
}


// CONNECT TO MONGODB
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connection was successful"))
.catch(error => console.log("SORRY, DB CONNECTION ERROR: ", error));


// THIS IS FOR THE HEROKU CONFIGURATION SETTINGS
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// SETTING MIDDLEWARE
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
});



// STARTING THE SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});