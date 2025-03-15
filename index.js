const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/Chat.js");
const methodOverride=require("method-Override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride
    ("_method")
);

main().then(()=>{
    console.log("connection succesfull")
}).catch(err=> console.log(err));

async function main() {
  await  mongoose.connect('mongodb://127.0.0.1:27017/chatApp');
}

// let chat1=new Chat({
//     from:"sumanth",
//     to:"noOne",
//     msg:"justb checkingg of workingness",
//     created_at:new Date()
// });

// chat1.save().then(res=>{
//     console.log(res);
// })

app.get("/home",async(req,res)=>{
    let chats=await Chat.find();
    // console.log(chats);
    // res.send(chats);
    res.render("home.ejs",{chats});
})
app.get("/home/new",(req,res)=>{
    res.render("new.ejs");
})

//create route
app.post("/home",(req,res)=>{
    let{from,to,msg}=req.body;
    let newChat=new Chat(
        {
            from:from,
            to:to,
            msg:msg,
            created_at:new Date()
        })
        newChat.save().then(res=>{
        console.log(res);
        })
        res.redirect("/home");
})

//Edit route
app.get("/home/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update route
app.put("/home/:id",async (req,res)=>{
    let{id}=req.params;
    let {msg:newMsg}=req.body;
    console.log(newMsg);
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidator:true,new:true})
    res.redirect("/home");
})
//delete route
app.delete("/home/:id",async (req,res)=>{
    let{id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    res.redirect("/home");
})
app.get("/",(req,res)=>{
    res.send("root is working");
});

app.listen(8080,(req,res)=>{
  console.log(`server is listening at ${8080}`);  
})

