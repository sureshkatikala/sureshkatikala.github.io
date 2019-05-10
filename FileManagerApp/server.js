var express = require('express')
// let database = require('./database');
var cors = require('cors')

let filesystem = require('./filesystem');
// let test = require('./test')
// let folder  = require("../filesystem")
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: true}))


app.get('/', (req, res) => {
	res.send("Mandi Api endpoint")
})

app.get('/loadfiles',(req, res) => {
    filesystem.displayData('./filesystem').then(response => {
        res.send(response);
    });
	
})

// app.post('/getData', function (req, res) {
// 	console.log('receiving data ...');
// 	console.log('body is ', req.body);

// 	database.getDatabaseData()
// 		.then(dataRecieved => {
// 			// console.log(dataRecieved)
// 			res.send(dataRecieved);
// 		})

// });

app.listen(port, () => { console.log("App is running on port 3000") })