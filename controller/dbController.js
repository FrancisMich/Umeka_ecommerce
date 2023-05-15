const mongoose = require('mongoose');
const uri = process.env.URI;

async function connect (){
    try {
        await mongoose.connect(uri);
        console.log("connected to mongodb");
    } catch(error){
        console.log(error);
    }
}
connect();

module.exports = connect;