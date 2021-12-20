const express = require('express');
const login = require("../service/adminLogin");
const adminLogin = express.Router();

adminLogin.post('/',(req, res) => {
    const account = req.body.account;
    const password = req.body.password;
    login(account, password).then((value)=>{
        console.log(value)
        value = value.toString();
        res.send(value);
    });
})

module.exports = adminLogin;