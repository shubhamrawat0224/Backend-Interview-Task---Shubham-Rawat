var cron = require('node-cron');
const axios = require('axios');
require('./mongodb/connection');
const etherprice = require('./models/EthPricemodel');

cron.schedule('*/10 * * * * ', async() => {
  let ethprice = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
  console.log(ethprice.data.ethereum.inr);
  console.log(new Date().toLocaleString());
  const reg = new etherprice({
    price:ethprice.data.ethereum.inr
})
reg.save().then(()=>{
    console.log(reg)
}).catch((err)=>{
    console.log(err)
})
});

