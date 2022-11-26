const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

const db=require('./config/keys').MongoURI;

//connecting to Mongo
mongoose.connect(db, {useNewUrlParser: true})
.then(() => {
    console.log('MongoDB Connected...')
}).catch((err) => {
    console.log(err);
});

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));

// Routes
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));
const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started at ${PORT}`)); 