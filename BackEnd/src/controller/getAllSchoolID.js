const {MongoClient} = require("mongodb");
const express = require('express');
const getAllSchoolID = express.Router();
const MongoUrl = "mongodb://localhost:27017/";

getAllSchoolID.get('/',(req,res)=>{
    MongoClient.connect(MongoUrl,(err,db)=>{
        if(err) throw err;
        let dbo = db.db('StuStatus');
        dbo.collection('school').find().toArray((err,result)=>{
            let ret = [];
            for (let i = 0; i < result.length; i++) {
                ret.push(result[i]);
            }
            res.send(ret);
        })
    })
})

module.exports = getAllSchoolID;