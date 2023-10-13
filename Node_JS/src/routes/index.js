import express from 'express';
import bodyParser from 'body-parser'
import { DiaryEntryModel } from '../db/models/DiaryModel.js';
import mongoose from 'mongoose';

const app = express();

let diaryEntries = [
    {id: 1, date:"October 10th", entry:"Entry 1"},
    {id: 2, date:"October 15th", entry:"Entry 2"},
    {id: 3, date:"October 2nd", entry:"Entry 3"},
  ];

app.use(bodyParser.json());

app.use((req,res,next) =>{ // CORS
    res.setHeader('Access-Control-ALlow-Origin', '*');
    res.setHeader('Access-Control-ALlow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-ALlow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
})

app.get('/max-id', (req,res)=>{
    let max = 0;
    for (let i=0; i < diaryEntries.length; i++){
        if(diaryEntries[i].id > max){
            max = diaryEntries[i].id
        }
    }
    res.json({
        maxId: max
    })
})


app.get("/diary-entries", (req,res, next)=>{
    DiaryEntryModel.find()
        .then((data)=>{
            res.json({
                'DiaryEntries': data
            })  
        })
        .catch(()=>{
            console.log("Error fetching entries")
        })

    res.json({diaryEntries})
});

app.post("/add-entry", (req,res)=>{
    const diaryEntry = new DiaryEntryModel({
        date: req.body.date,
        entry: req.body.entry
    })

    diaryEntry.save();

    console.log(diaryEntry);

    diaryEntries
        .push({
            id: req.body.id,
            date: req.body.date,
            entry: req.body.entry
        } )
        res.status(200).json({
            message: "Post submitted."
        })
})


app.put("/update-entry/:id", (req,res)=>{
   const index = diaryEntries.findIndex(el =>{
        return el.id == req.params.id
   })
   diaryEntries[index] = {
        id: req.body.id,
        date: req.body.date,
        entry: req.body.entry
   }
   res.status(200).json({
        message: "Post Updated"
   })
})


app.delete("/remove-entry/:id", (req,res)=>{
   const index = diaryEntries.findIndex(el =>{
    return el.id == req.params.id
   })
   diaryEntries.splice(index,1)
   res.status(200).json({
    message: "Post deleted"
   })
})

export default app;