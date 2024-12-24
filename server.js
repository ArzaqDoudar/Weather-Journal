// Setup empty JS object to act as endpoint for all routes
// let projectData = [];
var projectData = {}
const port = 8000;
// Require Express to run server and routes
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.post('/addData', addData);
const addData = (req, res) => {
    console.log("POST")
    let data = req.body;
    console.log('data', data);
    projectData = data
    console.log("projectData = ", projectData);
    res.status(200).send('success')
}

app.get('/all', (req, res) => {
    console.log("GET")
    res.send(projectData);
})
