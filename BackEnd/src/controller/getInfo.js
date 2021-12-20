const express = require('express');
const {MongoClient} = require("mongodb");
const getInfo = express.Router();
const MongoUrl = "mongodb://localhost:27017/";

getInfo.post('/',(req,res)=>{
    let table =req.body.table;
    let ID=req.body.ID;
    let r={};
    if(table==='Stu') getinfo_Stu(ID,table);
    if(table==='class') getinfo_Class(ID,table);
    if(table==='major') getinfo_Major(ID,table);
    if(table==='school') getinfo_School(ID,table);


    function getinfo_Stu(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).find({ID:ID}).toArray((err,result)=>{
                r[table]=result;
                ID=result[0].class_ID;
                getinfo_class(ID,'class')
            })
        })
    }
    function getinfo_class(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).find({ID:ID}).toArray((err,result)=>{
                r[table]=result;
                ID=result[0].major_ID;
                getinfo_major(ID,'major');
            })
        })
    }
    function getinfo_major(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).find({ID:ID}).toArray((err,result)=>{
                r[table]=result;
                ID=result[0].school_ID;
                getinfo_school(ID,'school');
            })
        })
    }
    function getinfo_school(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection(table).find({ID:ID}).toArray((err,result)=>{
                r[table]=result;
                res.send(r);
                db.close();
            })
        })
    }
    let a=0;
    let b=0;
    let c=0;
    function getinfo_Class(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection('Stu').find({class_ID:ID}).toArray((err,result)=>{
                for (let i = 0; i < result.length; i++) {
                    r['Stu'+a]=result[i];
                    a++;
                }
                ID=result[0].class_ID;
                getinfo_class(ID,table);
            })
        })
    }

    function getinfo_Major(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection('class').find({major_ID:ID}).toArray((err,result)=>{
                for (let i = 0; i < result.length; i++) {
                    r['class'+b]=result[i];
                    b++;
                    getinfo_Class1(result[i].ID,'class');
                }
                getinfo_major(ID,table);
            })
        })
    }
    function getinfo_Class1(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection('Stu').find({class_ID:ID}).toArray((err,result)=>{
                for (let i = 0; i < result.length; i++) {
                    r['Stu'+a]=result[i];
                    a++;
                }
            })
        })
    }


    function getinfo_School(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection('major').find({school_ID:ID}).toArray((err,result)=>{
                for (let i = 0; i < result.length; i++) {
                    r['major'+c]=result[i];
                    c++;
                    getinfo_Major1(result[i].ID,'major');
                }
                getinfo_school(ID,table);
            })

        })
    }
    function getinfo_Major1(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            dbo.collection('class').find({major_ID:ID}).toArray((err,result)=>{
                for (let i = 0; i < result.length; i++) {
                    r['class'+b]=result[i];
                    b++;
                    getinfo_Class1(result[i].ID,'class');
                }
            })
        })
    }
})

module.exports = getInfo;