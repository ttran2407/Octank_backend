const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var mysql = require('mysql');

// create a connection variable with the required details
var con = mysql.createConnection({
  host: "octankdatabase.cluster-cuqcrvxm3m5o.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  user: "octankadmin", // user name to your mysql database
  password: "octankadmin", // corresponding password
  database: "octankadmin" // use the specified database
});

// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  // if connection is successful
 console.log('connection successful');
});



app.get('/',(req,res)=>{
  res.json('OK');
})

app.post('/',(req,res)=>{
  console.log(req.body)
	var {name,rollno} =req.body;
	var records = [[req.body.name,req.body.rollno]];
	if(records[0][0]!=null)
	{
		con.query("INSERT into student (name,rollno) VALUES ?",[records],function(err,res,fields){

			if(err) throw err;

			console.log(res);
		});
	}
	res.json(req.body);


})

app.listen(3001,()=>{
  console.log("Port 3001");
})
