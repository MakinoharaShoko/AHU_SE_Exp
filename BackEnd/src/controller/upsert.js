const express = require('express');
const {MongoClient} = require("mongodb");
const upsert = express.Router();
const MongoUrl = "mongodb://localhost:27017/";

upsert.post('/*',(req,res)=>{//upsert包含ID  *为table
    let url = req.url;
    let urlArray = url.split('/');
    let table=urlArray[urlArray.length-1];
    let info = req.body;
    MongoClient.connect(MongoUrl,(err,db)=>{
        if(err) throw err;
        let dbo = db.db('StuStatus');
        dbo.collection(table).updateMany({ID:info.ID},{$set:info},{upsert:true},(err,result)=>{
            if(err) throw err;
            let temp = result;
            db.close();
            res.send('OK');
        });

    })
})

module.exports = upsert;