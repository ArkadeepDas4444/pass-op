const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
dotenv.config()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOp';

client.connect()

app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.insertOne(password)
  res.send({ success: true, result: findResult })
})

app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.deleteOne(password)
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
