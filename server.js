const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4}= require('uuid');
const nocache = require('nocache');

const router = require('./router');
const app = express();
app.set('etag',false)

const port =process.env.PORT||3000;
app.use(nocache())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
   secret:uuidv4(),
   resave:false,
   saveUninitialized:true,
   cookie:{secure:false}
}));



app.use('/route',router);
// // home route

// app.get('/',(req,res)=>{
//    if(req.session.user){
//        res.render('dashboard.ejs',{user:req.session.user})
//    }else{
//        res.render('base.ejs',{title:"login page"})
//    }
   
// });

app.get('/',(req,res)=>{
   if(req.session.user){
       res.render('dashboard.ejs',{user:req.session.user})
   }else{
       res.render('base.ejs',{title:"Login_Sytem"})
   }
   
});



//  app.get('/',(req,res)=>{
//     res.render('base',{title:"Login System"})
//  })

 app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000" )});

