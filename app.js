const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads',express.static('uploads'));

const auth = require('./routes/auth');
const users = require('./routes/users');
const permissions = require('./routes/permissions');
const vacations = require('./routes/vacations');

app.use(auth);
app.use(users);
app.use(permissions);
app.use(vacations);



if(process.env.NODE_ENV === 'production'){
    console.log(process.env.NODE_ENV);
    app.use(express.static('hotels-front/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'hotels-front','build','index.html'))
    })
}else{
    app.use((req, res) => {
        res.send('<h1>Page not found</h1>')
    })
}

app.listen(process.env.PORT || 4000);