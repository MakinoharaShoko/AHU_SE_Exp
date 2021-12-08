//initialize
const Port = 3001;//设置端口号，一般是3000
const express = require('express');
const { fstat } = require('fs');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
process.env.PORT = Port;

app.use(express.static('public'));//allow browser access resources
app.use(cors());//允许跨域访问
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//err catch
process.on('uncaughtException',function(err){}) //监听未捕获的异常
process.on('unhandledRejection',function(err,promise){}) //监听Promise没有被捕获的失败函数
//StuStatus:库名
//Stu：学生表 class：班级 major：专业 school：学院
//DOT:退学时间 SOT:休学时间 RT：复学时间 AT：入学时间
const MongoUrl = "mongodb://localhost:27017/";

app.post('/getinfo',(req,res)=>{
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

app.post('/upsert/*',(req,res)=>{//upsert包含ID  *为table
    let url = req.url;
    let urlArray = url.split('/');
    let table=urlArray[2];
    let info = req.body;
    MongoClient.connect(MongoUrl,(err,db)=>{
        if(err) throw err;
        let dbo = db.db('StuStatus');
        dbo.collection(table).updateMany({ID:info.ID},{$set:info},{upsert:true},(err,result)=>{
            if(err) throw err;
            db.close();
            res.send('OK');
        });
        
    })
})

app.post('/delete',(req,res)=>{//body包含ID,table
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
                db.close();
                res.send('OK');
            })
        })
    }

    function delClass(ID,table){
        MongoClient.connect(MongoUrl,(err,db)=>{
            if(err) throw err;
            let dbo=db.db('StuStatus');
            delStu(ID)
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

app.get('/getAllSchoolID',(req,res)=>{
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

app.listen(Port, () => console.log('服务器已就绪，运行在端口'+Port))//输出服务器启动信息