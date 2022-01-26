const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
//create a schema
const todoSchema = require('../schema/todoSchema');
//create a model
const Todo = new mongoose.model('Todo', todoSchema);

//insert multiple todo
router.get('/', async (req, res) => {
    // await Todo.find({status: "active"}, (err, data) => {
    //     if(err){
    //         res.status(500).json({
    //             error: "there is an error in server side"
    //         })
    //     }else{
    //         res.status(200).json({
    //             result: data,
    //             message: "Data find successfully"
    //         })
    //     }
    // }).clone();

    //select particular filed
    await Todo.find({status: "active"}).select({
        _id: 0,
        __v: 0,
        date: 0,
    }).limit(2).exec((err, data) => {
        if(err){
            res.status(500).json({
                error: "there is an error in server side"
            })
        }else{
            res.status(200).json({
                result: data,
                message: "Data find successfully"
            })
        }
    });

    // try{
    //     const data = await Todo.find({status: 'active'}).select({ _id: 0, __v: 0 });
    //     res.status(200).json({
    //         result: data,
    //         message: "Data find successfully"
    //     })
    // }catch{
    //     res.status(500).json({
    //         error: "there is an error in server side"
    //     })
    // }
});

//insert single todo
router.get('/:id', async (req, res) => {
    await Todo.findOne({ _id: req.params.id }).exec((err, data) => {
        if(err){
            res.status(500).json({
                error: "there is an error in server side"
            })
        }else{
            res.status(200).json({
                result: data,
                message: "Data find successfully"
            })
        }
    });
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
            res.status(500).json({
                error: "there is an error in server side"
            })
        }else{
            res.status(200).json({
                message: "Todo were inserted successfully"
            })
        }
    });
})

//update a single todo
// router.put('/:id', async (req, res) => {
//     await Todo.updateOne({ _id: req.params.id }, {
//         $set: {
//             status: 'inactive',
//         }
//     }, (err) => {
//         if(err){
//             res.status(500).json({
//                 error: "there is an error in server side"
//             })
//         }else{
//             res.status(200).json({
//                 message: "Todo was update successfully"
//             })
//         }
//     }).clone();
// });

// update a single todo and get the result
router.put('/:id', async (req, res) => {
    const result = await Todo.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            status: 'active',
        }
    }, 
    { useFindAndModified: false, new: true }, 
    (err) => {
        if(err){
            res.status(500).json({
                error: "there is an error in server side"
            })
        }else{
            res.status(200).json({
                message: "Todo was update successfully"
            })
        }
    }).clone();

    console.log(result);
});

//delete a single todo
// router.delete('/deleteInactive', async (req, res) => {
//     await Todo.deleteMany({status: "inactive"}).exec((err) => {
//         if(err){
//             res.status(500).json({
//                 error: "there is an error in server side"
//             })
//         }else{
//             res.status(200).json({
//                 message: "data were delete successfully"
//             })
//         }
//     })
// });

router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete({_id: req.params.id},{ useFindAndModified: false }).exec((err, data) => {
        if(err){
            res.status(500).json({
                error: "there is an error in server side"
            })
        }else{
            res.status(200).json({
                result: data,
                message: "data were delete successfully"
            })
        }
    })
});

module.exports = router;