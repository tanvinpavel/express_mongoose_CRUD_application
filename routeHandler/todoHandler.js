const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
//create a schema
const todoSchema = require('../schema/todoSchema');
//create a model
const Todo = new mongoose.model('Todo', todoSchema);

//insert multiple todo
router.get('/', async (req, res) => {

});

//insert single todo
router.get('/:id', async (req, res) => {

});

//insert single todo
router.post('/', async (req, res) => {
    // console.log(req.body);
    const newTodo = new Todo(req.body);

    await newTodo.save((err) => {
        if(err){
            res.status(500).json({
                error: 'there was a server side error'
            });
        }else{
            res.status(200).json({
                message: 'Todo was inserted successfully',
            });
        }
    });
});

//insert multiple todo
router.post('/all', async (req, res) => {
    console.log(req.body);
    await Todo.insertMany(req.body, err => {
        if(err){
            res.status('500').json({
                error: "there is an error in server side"
            })
        }else{
            res.status('200').json({
                message: "Todo were inserted successfully"
            })
        }
    });
})

//update a single todo
router.put('/:id', async (req, res) => {

})

//delete a single todo
router.delete('/:id', async (req, res) => {

})


module.exports = router;