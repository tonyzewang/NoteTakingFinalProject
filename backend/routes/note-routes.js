const express = require('express')
const mongoose = require('mongoose');
const Note = require('../models/note');

const router = express.Router();

router.get('/', (req, res)=> {
    Note.find().exec().then(results => {
        console.log(results);
        res.status(200).json(results);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error : err})
    })
})

router.post('/', (req, res) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
    });
    note.save().then((result) => {
        console.log(result)
        res.status(201).json({
            message: "Note created",
            createdNote: result, 
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({error: err});
    });
});


router.patch('/:id', (req, res)=> {
    const id = req.params.id;
    Note.updateOne({_id: id}, {$set: req.body}).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Note.deleteOne({_id: id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({error: err});
    });
});

module.exports = router;

