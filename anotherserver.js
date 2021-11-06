const express = require("express");
const server = require(__dirname+"/server.js");

const app = express();

app.listen(3000, function(){
    console.log("another server started on 3000");
})