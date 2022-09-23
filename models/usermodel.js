var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var transectionSchema = new Schema({
    User: {
        type:String,
        required:true
    },
    Transection: Array,
    date:{
        type:String
    }
});


const registerTransection = mongoose.model('transection',transectionSchema)

// const me = new registerTransection({
//     User:'0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC',
//     Transection: []
// })

// me.save().then((me)=>{
//     console.log(me)
// }).catch((err)=>{
//     console.log(err)
// })
module.exports = registerTransection;