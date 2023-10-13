import express from "express";
import bodyParser from "body-parser";
import { DiaryEntryModel } from "../db/models/DiaryModel.js";
import mongoose, { mongo } from "mongoose";

const app = express();
let diaryEntries = [];

app.use(bodyParser.json());

app.use((req, res, next) => {
  // CORS
  res.setHeader("Access-Control-ALlow-Origin", "*");
  res.setHeader(
    "Access-Control-ALlow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-ALlow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

app.get("/max-id", (req, res) => {
  let max = 0;
  for (let i = 0; i < diaryEntries.length; i++) {
    if (diaryEntries[i].id > max) {
      max = diaryEntries[i].id;
    }
  }
  res.json({
    maxId: max,
  });
});

app.get("/diary-entries", (req, res, next) => {
  DiaryEntryModel.find()
    .then((data) => {
      res.json({
        diaryEntries: data,
      });
    })
    .catch((e) => {
      console.log("Error fetching entries!", e);
      res.status(500).json({ error: "Error fetching entries" }); // Retorne um status de erro
    });
});

app.post("/add-entry", (req, res) => {
  const diaryEntry = new DiaryEntryModel({
    date: req.body.date,
    entry: req.body.entry,
  });

  diaryEntry.save();

  console.log(diaryEntry);

  diaryEntries.push({
    id: req.body.id,
    date: req.body.date,
    entry: req.body.entry,
  });
  res.status(200).json({
    message: "Post submitted.",
  });
});

app.put("/update-entry/:id", (req, res) => {
  const updateEntry = new DiaryEntryModel({
    _id: req.body.id,
    date: req.body.date,
    entry: req.body.entry,
  });
  DiaryEntryModel.updateOne({ _id: req.body.id }, updateEntry).then(() => {
    res.status(200).json({
      message: "Post Updated",
    });
  });
});

app.delete("/remove-entry/:id", (req, res) => {
  DiaryEntryModel.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Post deleted",
    });
  });
});

export default app;
