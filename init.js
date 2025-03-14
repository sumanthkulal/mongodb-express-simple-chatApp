const mongoose = require('mongoose');
const chat=require("./models/chat.js");

main().then(()=>{
    console.log("connection succesfull")
}).catch(err=> console.log(err));

async function main() {
  await  mongoose.connect('mongodb://127.0.0.1:27017/chatApp');
}


let allChats=([
    {
    from:"peter",
    to:"Zypher",
    msg:"justb checkingg of Zypher",
    created_at:new Date()
    },
    {
        from:"Zypher",
        to:"Solstice",
        msg:"hello soltice",
        created_at:new Date()
    },
    {
        from:"sumanth",
        to:"noOne",
        msg:"what about update",
        created_at:new Date()
    },
    {
        from:"Crestonh",
        to:"Nyxar",
        msg:"its ok if your busy",
        created_at:new Date()
    },
    {
        from:"Creston",
        to:"Lumora",
        msg:"i will try now",
        created_at:new Date()
    },

]);

chat.insertMany(allChats);