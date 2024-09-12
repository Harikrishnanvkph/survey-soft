const express = require('express');
const app = express();
const dotenv = require('dotenv');
const {MongoClient} = require("mongodb");
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/',require("./Logic.js"));

async function startDatabase(){
	await client.connect();
	console.log("Database Connected");
}

async function startServer(){
	app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
    app.get('/', (req, res) => {
       res.send('Hello from Mobile Express Server!');
     });
}

async function init(){
	await startDatabase();
	await startServer();
}

init();

module.exports = client;
    
