const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { google } = require("googleapis");
const request = require("request");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const cors = require("cors");
const axios = require("axios");
const { json } = require("body-parser");
const { response } = require("express");

// 412564020124-qr6c7fsgafarqu442obmbtspl9e2k5p7.apps.googleusercontent.com
// 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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/bmi", function (req, res) {
    res.sendFile(__dirname + "/bmi.html")
});

app.post("/bmi.html", function (req, res) {
    console.log("post initiated");
    var Weight = Number(req.body.weight);
    var Height = Number(req.body.height);

    var bmi = Weight / (Height * Height);
    var range;
    if (bmi < 19) {
        range = "undeweight";
    } else if (bmi > 19 && bmi < 25) {
        range = "normal";
    } else if (bmi > 25 && bmi < 30) {
        range = "overweight";
    } else {
        range = "obese";
    }

    var bmiResponse = {
        val: bmi,
        comment: range
    }
    res.send(bmiResponse);
});

app.get("/login", (req, res)=>{
    const oauth2Client = new google.auth.OAuth2(
        "412564020124-qr6c7fsgafarqu442obmbtspl9e2k5p7.apps.googleusercontent.com",
        "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",
        "http://localhost:3000/fit-dash"
    )

    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"];
    const url = oauth2Client.generateAuthUrl({
        access_type:"offline",
        scope: scopes,
        state: json.toString({
            callbackUrl: req.body.callbackUrl, 
            userID: req.body.userid
        })
    });

    request(url, (err, response, body) =>{
        console.log("error", err);
        console.log(response && response.statusCode);
        res.send({url});
    });
});

app.get("/fit-dash", async (req, res)=>{
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query.code);
    console.log(code);
})

app.listen(3000, function () {
    console.log("server started on port 3000");
});