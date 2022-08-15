const express = require('express');
const mongoose  = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema);


// get all todo
router.get('/' , async(req, res) => {
    try {
        const data = await Todo.find();
        res.status(200).json({
            result: data,
            message: "Todo was send successfully"
        });
    } 
    catch (error) {
        res.status(500).json({error:'There was a Server Side Error!'})
    }
})


// get a todos
router.get('/:id' , async(req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id});
        res.status(200).json({
            result: data,
            message: "Todo was send successfully"
        });
    } 
    catch (error) {
        res.status(500).json({error:'There was a Server Side Error!'})
    }
});


// post A todo
router.post('/' , (req, res) => {
    const newTodo = new Todo(req.body)
     newTodo.save((err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: 'todo was inserted successfully'
            })
        }
    });
});

// post multiple todos
router.post('/all' , (req, res) => {
    Todo.insertMany(req.body, (err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: 'todo was inserted successfully'
            })
        }
    })
});


// put todo

router.put('/:id' , async (req, res) => {
    try {
      const result = await Todo.findByIdAndUpdate({ _id: req.params.id }, { $set: 
        { 
            title: req.body.allData.title,
            description: req.body.allData.des,
        }
    }, { new: true, useFindAndModify: false });
    
      res.status(200).json({message: "Todo Was Update successfully!"});
    } catch (error) {
      res.status(500).json({error:'There was a Server Side Error!'})
    }

  });



// delete one todo
router.delete('/:id' , (req, res) => {
    Todo.deleteOne({ _id: req.params.id}, (err) => {
        if(err){
            res.status(500).send({
                error: 'There was a server side error'
            })
        } else {
            res.status(200).json({
                message: "Todo is deleted successfully"
            })
        }
    }).clone()

});


module.exports = router;