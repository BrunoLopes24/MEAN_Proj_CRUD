import express from "express";
import bodyParser from "body-parser";
import { DiaryEntryModel } from "../db/models/DiaryModel.js";
import { UserModel } from "../db/models/userModel.js";
import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const app = express();
let diaryEntries = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
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

// REGISTO/LOGIN

app.post("/sign-up", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userModel = new UserModel({
        username: req.body.username,
        password: hash,
      });

      return userModel.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User created",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.post("/login", (req, res) => {

  let userFound;
  UserModel.findOne({username: req.body.username})
    .then(user => {
      if (!user){
        return res.status(404).json({
          message: "User not found",
        });
      }
        userFound = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if (!result){
          return res.status(401).json({
            message: "Password is incorrect",
          });
        }
        const token = jwt.sign({username: userFound.username, userId: userFound._id}, "secret_string", {expiresIn: "24h"});
        console.log("Login successful");
        return res.status(200).json({
          token: token,
        })
    })
    .catch(err => {
      if (!result){
        return res.status(401).json({
          message: "Password is incorrect",
        });
      }
    })

})

export default app;
