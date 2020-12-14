const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  //console.log(fname,lname,email);
  var data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
         FNAME : fname,
         LNAME : lname
       }
      }
    ]
  };
var jsonData  = JSON.stringify(data);
  var options = {
    url : "https://us7.api.mailchimp.com/3.0/lists/93b5dbc8bf",
    method :"POST",
    headers : {
      "Authorization" : "Shikha d407210756e8619778ff9cfba06a0c09-us7"
    },
    // body : jsonData
  };
  request(options,function(error,response,body){
    if(error || response.statusCode!=200){
      res.sendFile(__dirname + "/failure.html");
    }
    else{
      res.sendFile(__dirname + "/success.html");
    }
  });
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("Listning to port 3000");
});


// API Key
// d407210756e8619778ff9cfba06a0c09-us7
//
// ListId
// 93b5dbc8bf
