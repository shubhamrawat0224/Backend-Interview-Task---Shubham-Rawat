const Balance=function(data,user){
    let n = data.length;
    let balance=0;
    for(let i=0;i<n;i++){
        if(data[i].from==user){
        balance=balance+parseInt(data[i].value);
        //console.log(data[i].value)
        //console.log(balance,'after adding')
        }else{
        balance=balance-parseInt(data[i].value);
        //console.log(data[i].value)
        //console.log(balance,'after subtracting')
        }
        return balance;
    }
}

module.exports = Balance;