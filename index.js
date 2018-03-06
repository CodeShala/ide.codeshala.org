var express = require('express');
var bodyParser = require('body-parser')
var compile_run = require('compile-run');
var app = express();


app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req, res)=>{
	res.render('index');
})

app.post('/run',(req,res)=>{
	//console.log(req.body.language+" "+req.body.code+" "+req.body.input);
	var language=req.body.language;
	var code=req.body.code;
	var input=req.body.input;
	if(language=="c"){
		compile_run.runC(code, input, function (stdout, stderr, err) {
			if(!err){
				res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify({ stdout: stdout,stderr: stderr}));
			}
			else{
				res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify({ stderr: err}));
			}
		});
	}else if(language=="c++"){
		compile_run.runCpp(code, input, function (stdout, stderr, err) {
			if(!err){
				res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify({ stdout: stdout,stderr: stderr}));
			}
			else{
				res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify({ stderr: err}));
			}
		});
	}else{
		console.log('Language Not Supported')
	}
	//res.send("OK");
})

app.get('/*',(req, res)=>{
	res.send('404 | Page Not Found');
})

app.listen(process.env.PORT||3000,function(){
	console.log('SERVER LISTENING');
})