var express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
const key = process.env.API_KEY;
const port = process.env.PORT || 3000;
const connect = require('./mongodb/connection');
const User = require('./models/usermodel');
const ethprice = require('./ethprice');
const Balance = require('./check');
console.log(connect)
app.use(express.json())

console.log(ethprice);

// etherscan api to fetch the list of “Normal” transactions for a user.
app.get('/UserTransactions', async (req,res)=>{
    try{
            const user = req.query.user;
            //console.log(user)
            //https://api.etherscan.io/api?module=account&action=txlist&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken
            let result = await axios.get('https://api.etherscan.io/api',{params: { module:'account',action:'txlist',address: user,startblock:0,endblock: 99999999,page: 1,offset: 108,sort:'asc',apikey: key}})
       // console.log(result)
       //console.log(result.data.message)
        if(result.data.message=='OK'){
            // let reg = await User.insert({User:user,Transection:result.data.result});
            // console.log(reg);
            const reg = new User({
                User:user,
                Transection: result.data.result,
                date: new Date().toLocaleString()
            });
            reg.save().then(()=>{
                console.log(reg)
                return res.status(200).send(result.data.result);
            }).catch((err)=>{
                console.log(err)
                return res.status(404).send(err);
            })
            //console.log(result.data.result);
            
        }else{
            //console.log('err')
            return res.status(404).send("ERROR");
        }
    }catch(err){
        return res.status(500).send(err);
    }
})

//API TAKES USER ACCOUNT NUMBER TO GET BACK THE BALANCE AND THE CURRENT PRICE OF ETHEREUM 
app.get('/UsersBalance', async(req,res)=>{
    try{
        const user = req.query.user;
        let result = await axios.get('https://api.etherscan.io/api',{ params: {module:'account',action:'txlist',address: user,startblock:0,endblock: 99999999,page: 1,offset: 108,sort:'asc',apikey: key}})
        //console.log(result.data.result)
        if(result.data.message=='OK'){
            // let reg = await User.insert({User:user,Transection:result.data.result});
            // console.log(reg);
            let Value=await Balance(result.data.result,user);
           // console.log(result.data.result);
           let ethprice = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
            console.log(Value);
            console.log(ethprice.data.ethereum.inr)
            return res.status(200).send({
               balance: Value.toString(),
               Ethereum_price: ethprice.data.ethereum.inr
            });
            
        }else{
            console.log(result.data.message)
            return res.status(404).send(result.data.message);
        }
    }catch(err){
        return res.status(500).send(err);
    }
})

app.listen(port,function(){
    console.log(`app is on ${port}`)
})