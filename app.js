const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// app.use(bodyParser)
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.post("/", function(req,res){
    const firstName = req.body.fName;
    const secondName = req.body.sName;
    const emailAddress = req.body.eAddress;
    const data = {
        members:[
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    };
    const JSONdata = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/e5efed23f3";
    const options = {
        method : "POST",
        auth: "aadi2305:13951e36be736aa372a724facecb6fa9-us2"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            //console.log(JSON.parse(data));
        })
    })

    request.write(JSONdata);
    request.end();
})
app.post("/failure", function (req,res) { 
    res.redirect("/");
 })
app.get("/", function(req,res){
    
    res.sendFile(__dirname+ "/index.html");
})


app.listen(3000, function () { 
    console.log("Server is running smoothly at port 3000!");
 })

 //API KEY
 // 13951e36be736aa372a724facecb6fa9-us2
 //e5efed23f3