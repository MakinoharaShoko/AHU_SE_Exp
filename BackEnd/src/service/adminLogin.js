const {MongoClient} = require("mongodb");
const MongoUrl = "mongodb://localhost:27017/";

const getToken = () => {
    let token = Math.random()*1000;
    token = Math.floor(token);
    return token;
}

const login = async (account, password,) => {
    const verify = new Promise((resolve, reject) => {
        MongoClient.connect(MongoUrl, (err, db) => {
            if (err) throw err;
            const dbo = db.db('StuStatus');
            dbo.collection('account').find({account: account}).toArray((err, res) => {
                let correctPassword = res[0]['password'];
                if (correctPassword === password) {
                    let token = getToken();
                    dbo.collection('tokenList').insertOne({token: token},(err,result)=>{
                        if(err) throw err;
                        db.close();
                        resolve(token);
                    });
                } else {
                    resolve('ERROR')
                }
            })
        })
    })
    return verify;
}

module.exports = login;