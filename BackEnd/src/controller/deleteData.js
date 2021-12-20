const {MongoClient} = require("mongodb");
const express = require('express');
const deleteData = express.Router();
const MongoUrl = "mongodb://localhost:27017/";

deleteData.post('/',(req,res)=>{//body包含ID,table
    let table =req.body.table;
    let ID=req.body.ID;
    let returnMessage ={};
    if(table==='Stu') delStu(ID,table);
    if(table==='class') delClass(ID,table);
    if(table==='major') delMajor(ID,table);
    if(table==='school') delSchool(ID,table);
    function delStu(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).deleteMany({ID:ID},(err,result)=>{
                if(err) throw err;
                let temp = result;
                db.close();
                res.send('OK');
            })
        })
    }

    function delClass(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).deleteMany({ID:ID},(err,result)=>{
                if(err) throw err;
                returnMessage[table] = result;
                delStu1(ID,'Stu');
            })
        })
    }
    function delStu1(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).deleteMany({class_ID:ID},(err,result)=>{
                if(err) throw err;
                db.close();
                returnMessage[table] = result;
                res.send(returnMessage);
            })
        })
    }


    function delMajor(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).deleteMany({ID:ID},(err,result)=>{
                if(err) throw err;
                returnMessage[table] = result;
                delClass1(ID,'class')
            })
        })
    }
    function delClass1(ID,table){
        let id=[];
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            delStu(ID);
            dbo.collection(table).find({major_ID:ID}).toArray(function(err,result1){
                for (let i = 0; i < result1.length; i++) {
                    id[i] = result1[i].ID;
                }
            })
            if(id.length==0){
                db.close();
                res.send(returnMessage);
            }
            dbo.collection(table).deleteMany({major_ID:ID},(err,result)=>{
                if(err) throw err;
                returnMessage[table] = result;
                for (let i = 0; i < id.length; i++){
                    delStu1(id[i],'Stu');
                }
            })
        })
    }


    function delSchool(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).deleteMany({ID:ID},(err,result)=>{
                if(err) throw err;
                returnMessage[table] = result;
                delMajor1(ID,'major')
            })
        })
    }
    function delMajor1(ID,table){
        let id=[];
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).find({school_ID:ID}).toArray(function(err,result1){
                for (let i = 0; i < result1.length; i++) {
                    id[i] = result1[i].ID;
                }
            })
            if(id.length==0){
                db.close();
                res.send(returnMessage);
            }
            dbo.collection(table).deleteMany({school_ID:ID},(err,result)=>{
                if(err) throw err;
                returnMessage[table] = result;
                for (let i = 0; i < id.length; i++) {
                    delClass1(id[i],'class')
                }
            })
        })
    }
})

module.exports = deleteData;