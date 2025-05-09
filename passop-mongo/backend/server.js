const express = require('express')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require("cors")
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

const dotenv = require('dotenv');
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop';

client.connect();

//get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save a password
app.post('/', async (req, res) => {
    const pass = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(pass)
    res.send({success:true, result: findResult})
})

//delete a password
app.delete('/', async (req, res) => {
    const pass = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(pass)
    res.send({success:true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})