const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.b8vg83y.mongodb.net/?retryWrites=true&w=majority`;

//Middlewire
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// async function run() {
//   try {

//   } finally {
//     //await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Project Server Running");
});

app.listen(port, () => {
  console.log(`Project Server Running on port ${port}`);
});

client.connect();
console.log("You successfully connected to MongoDB!");
client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

const applycollection = client.db("projectDB").collection("applydata");
const userinfocollection = client.db("projectDB").collection("users");
const reviewcollection = client.db("projectDB").collection("review");
const collageData = client.db("projectDB").collection("collagedata");
const collagesData = client.db("projectDB").collection("collagesdata");

app.get("/applydata", async (req, res) => {
  const result = await applycollection.find().toArray();
  res.send(result);
});

app.get("/collagedata", async (req, res) => {
  const data = await collageData.find().toArray();
  console.log(data);
  res.send(data);
});

app.get("/collagedata/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const data = await collageData.findOne(query);
  res.send(data);
});

app.get("/collageroute", async (req, res) => {
  const data = await collagesData.find().toArray();
  res.send(data);
});

app.get("/collageroute/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const data = await collagesData.findOne(query);
  console.log(data);
  res.send(data);
});

app.post("/applydata", async (req, res) => {
  const applydata = req.body;
  const result = await applycollection.insertOne(applydata);
  res.send(result);
});

app.post("/users", async (req, res) => {
  const user = req.body;
  const result = await userinfocollection.insertOne(user);
  res.send(result);
});

app.post("/review", async (req, res) => {
  const review = req.body;
  const result = await reviewcollection.insertOne(review);
  res.send(result);
});
app.get("/review", async (req, res) => {
  const result = await reviewcollection.find().toArray();
  res.send(result);
});
