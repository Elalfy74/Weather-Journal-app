// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express= require('express');
const app= express();
// Start up an instance of app
const port=3000;
app.listen(port,()=>{
    //message which will apear to the terminal if the server run well
    console.log(`server is running on http://localhost:${port}`)
});
/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
//to send the data to the UI
app.get('/get',(req,res)=>{
    res.send(projectData)
});

//get the data from UI and save it in projectData object
app.post('/postd',(req,res)=>{
      
     projectData=req.body
     console.log("hello nour")
});

