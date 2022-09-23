const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(response=>{
    console.log('Mongodb is connected')
})
.catch(err=>{
    console.log('Error Connection')
})

