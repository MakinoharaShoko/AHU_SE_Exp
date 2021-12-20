//initialize
const Port = 3001;//设置端口号，一般是3000
const express = require('express');
const { fstat } = require('fs');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const getInfo = require("./src/controller/getInfo");
const upsert = require("./src/controller/upsert");
const deleteData = require("./src/controller/deleteData");
const getAllSchoolID = require("./src/controller/getAllSchoolID");
const adminLogin = require("./src/controller/adminLogin");
process.env.PORT = Port;

app.use('/', express.static(__dirname + '/public'));//allow browser access resources
// app.use(cors());//允许跨域访问

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

//测试服务器访问情况
app.get('/',(req,res)=>{
    res.send('Sever OK!')
})

app.use('/getinfo',getInfo);
app.use('/upsert',upsert);
app.use('/delete',deleteData);
app.use('/getAllSchoolID',getAllSchoolID)
app.use('/login',adminLogin);

app.listen(Port, () => console.log('服务器已就绪，运行在端口'+Port))//输出服务器启动信息