import inquirer from "inquirer";
import fs from "fs";
import { exec,spawn } from "child_process";
let j = spawn("ls",["la"]);
j.stdout.on("data", function(data){
	console.log(data);
})

fs.appendFile("./They.txt", "data",function(err){
	if (err) throw err;
	console.log("saved")
});
const questions = [
	{
		type: "input",
		name: "entered-cmd",
		message: "Enter a cmd command: ",
	},
];

// inquirer
inquirer.prompt(questions).then((answers) => {
	console.log(answers);
});
