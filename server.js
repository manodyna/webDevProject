const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/google-fit-data", function (req, res) {
    res.send("google fit dash");
});

app.listen(3000, function () {
    console.log("server started on port 3000");
});