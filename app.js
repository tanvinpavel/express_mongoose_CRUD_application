//dependency
const express = require('express');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

const app = express();
app.use(express.json());

// import mongoose
const mongoose = require('mongoose');
//connection
mongoose.connect('mongodb://localhost/todos', {useNewUrlParser: true, useUnifiedTopology: true, family: 4})
    .then(() => {
        console.log('connect successfully');
    })
    .catch((err) => {
        console.log(err);
    })

app.use('/todo', todoHandler);
app.use('/user', userHandler);

//another method
// mongoose.connect('mongodb://localhost/todos', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 }, (err) => {
//     if(err){
//         console.log('There is an error');
//     }else{
//         console.log('Success');
//     }
// })

//error handler
function errorHandler(err, req, res, next){
    if(req.headerSent){
        return next(err);
    }

    res.status(500).json({ error: err });
}

app.listen(5000, () => {
    console.log('Server is running in port 5000');
})