var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var EtherPriceSchema = new Schema({
    price:{
        type: Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const EtherPrice = mongoose.model('EthPrice',EtherPriceSchema);

module.exports = EtherPrice;