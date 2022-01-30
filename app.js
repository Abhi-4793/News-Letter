//jshint esversion: 6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function (req,res) {
  res.sendFile(__dirname+"/signup.html");
  });

app.post("/",function (req, res) 
{
  var first = req.body.First;
 var second = req.body.last;
 var email = req.body.email;

var data = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: first,
      LNAME: second
    }
  }]
};


const jsonData = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/0c61657800";
const options = {
  method:"POST",
  auth: "abhinav:ea159ec64743e54a62c36826b15e06f7-us14"
}
const request = https.request(url, options, function(response){
if(response.statusCode === 200){
  res.sendFile(__dirname +"/sucess.html");
}
else{
  res.sendFile(__dirname +"/failure.html");
}

response.on("data",function (data) 
{
  console.log(JSON.parse(data));
  })
 })
 request.write(jsonData);
 request.end();
  });
app.post("/failure",function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000,function () {
    console.log("server is running on port 3000");
  })



//   api key
// ea159ec64743e54a62c36826b15e06f7-us14

// // unique id
// 0c61657800