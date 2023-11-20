const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const { createServer } = require('node:http');
var Db = require('mongodb').Db
var mongodb = require("mongodb")
var ObjectId = require('mongodb').ObjectId
var MongoClient = require('mongodb').MongoClient
var ReplSetServers = require('mongodb').ReplSetServers
const multer = require('multer');
var fs = require('fs');
const { Server } = require('socket.io');
const { Readable } = require('node:stream');
const { log } = require('node:console');
const upload = multer();

const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const port = process.argv[2] || 3000;
console.log("Running on port: " + port);
const server = createServer(app);
const io = new Server(server);


// var replSet = new ReplSetServers([
//     new Server('127.0.0.1', 27017),
//     new Server('127.0.0.1', 27012),
//     new Server('127.0.0.1', 27011)
//   ]);
//   var db = new Db('integration_test_', replSet, {w:0});
// db.open(function(err, p_db) {
//     console.log("connected");
//   assert.equal(null, err);
//   p_db.close();
// });

console.log("working");
const uri = 'mongodb://127.0.0.1:27012/local?directConnection=true&replicaSet=myReplSet';

const client = new MongoClient(uri);
async () => {
  await client.connect();
}
async function first() {
  console.log("Executing");
  try {
    await client.connect();
    // console.log('Connected to MongoDB replica set');

    // Your code to interact with the replica set goes here
    const database = client.db("Capstone_2");
    const collection = database.collection("exams");

    // open a Change Stream on the "haikus" collection
    changeStream = collection.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", async (next) => {
      const cursor = await collection.find({ fromDate: { $lte: new Date().toLocaleString() }, toDate: { $gte: new Date().toLocaleString() } }).toArray()
      const cursor2 = await collection.find({ fromDate: { $lt: new Date().toLocaleString() }, toDate: { $lt: new Date().toLocaleString() } }).toArray()
      console.log("All Documents: ", cursor);
      io.emit('update', cursor);
      io.emit('previous', cursor2);
      // process any change event
      console.log("received a change to the collection: \t", next);
    });

    console.log("closed the change stream")
    const collections = await client.db().listCollections().toArray();
    console.log('Collections in the connected database:', collections.map(collection => collection.name));
  } catch (error) {
    console.log(error + ">>>>");
  }
}
app.get('/', (req, res) => {
  res.send('Hello World! running on ' + port)

  // Send a ping to confirm a successful connection
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
})
app.get('/examsSchedule', async (req, res) => {
  try {
    // console.log(req.body)
    await client.connect();
    const database = client.db("Capstone_2");
    const col1 = database.collection("exams");
    const testDate = new Date().toLocaleString()
    console.log(new Date().toLocaleString())
    const query = { fromDate: { $lte: testDate }, toDate: { $gte: testDate } }
    const cursor = await col1.find(query).toArray()
    console.log(cursor)
    if (cursor.length == 0) {

      res.send({ "status": "success", "message": "No Exams are sceduled, comeback later" })
    }
    else {
      res.send(cursor)
    }
  }
  catch (error) {
    res.send({ "status": "error", "message": "Try again after sometime: " + error })
  }

})
app.get('/previousExams', async (req, res) => {
  try {
    // console.log(req.body)
    await client.connect();
    const database = client.db("Capstone_2");
    const col1 = database.collection("exams");
    const testDate = new Date().toLocaleString()
    console.log(new Date().toLocaleString())
    const query = { fromDate: { $lt: testDate }, toDate: { $lt: testDate } }
    const cursor = await col1.find(query).toArray()
    console.log(cursor)
    if (cursor.length == 0) {

      res.send({ "status": "success", "message": "No Exams are sceduled, comeback later" })
    }
    else {
      res.send(cursor)
    }
  }
  catch (error) {
    res.send({ "status": "error", "message": "Try again after sometime: " + error })
  }

})

app.post("/upload", upload.array('scripts'), async (req, res) => {
  try {
    // await client.connect();
    // console.log('Connected to MongoDB replica set');

    // Your code to interact with the replica set goes here
    const db = client.db("Capstone_2");
    const col1 = db.collection("examUploads");
    // const bucket = new mongodb.GridFSBucket(db, { bucketName: "Uploaded Answers" });
    // const result = await col1.deleteOne({"username":req.body.username,"examid":req.body.Examid});
    // console.log(result);
    col1.updateOne({ "username": req.body.username, "examid": req.body.Examid }, { $set: { [`answers.${req.body.questionno}`]: req.files ,[`script.${req.body.questionno}`]:req.body.answertext} }, { upsert: true })
    // col1.insertOne({"username":req.body.username,"answers":req.files,"examid":req.body.Examid})
    var len = req.files.length;
    // console.log(req.files);
    // req.files.map((file, index) => {
    //   const bufferStream = Readable.from(file.buffer);
    //   // Create a write stream to store the file in GridFS
    //   const uploadStream = bucket.openUploadStream(file.originalname); // Replace with the desired filename

    //   // Pipe the buffer stream to the GridFS write stream
    //   bufferStream.pipe(uploadStream);
    //   uploadStream.on('finish', () => {
    //     console.log(`File "${file.originalname}" uploaded successfully`);
    //   });
    //   uploadStream.on("error",(error)=>{
    //     console.log(error);
    //   })
    // })
    // console.log(JSON.parse(JSON.stringify(req.body)))
    res.send({ "status": "success", "message": "Answer Scripts uploaded succesfully" })
    // res.send(Array.from({ length: len }, () => Math.floor(Math.random() * 10)))
  }
  catch (error) {
    console.log(error);
    res.send({ "status": "error", "message": "Error: " + error })
  }
})
app.post("/profupload", upload.array('scripts'), async (req, res) => {
  try {
    const db = client.db("Capstone_2");
    const col1 = db.collection("profUploads");
    console.log("PROF FILES");
    console.log(req.files);
    const param = "answers." + req.body.questionno
    col1.updateOne({ "username": req.body.username, "examid": req.body.Examid }, { $set: { ["answers." + req.body.questionno]: req.files,[`script.${req.body.questionno}`]:req.body.panswertext } }, { upsert: true })
    // col1.insertOne({"username":req.body.username,"answers":req.files,"examid":req.body.Examid})
    var len = req.files.length;

    res.send({ "status": "success", "message": "Answer Scripts uploaded succesfully" })
  }
  catch (error) {
    console.log(error);
    res.send({ "status": "error", "message": "Error: " + error })
  }
})
app.post("/evaluate", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("Capstone_2");
    const col1 = database.collection("exams");
    const col2 = database.collection("profUploads");
    const col3 = database.collection("examUploads");
    console.log(req.body.examid);
    const cursor1 = await col1.findOne({ "_id": new ObjectId(req.body.examid) }, { projection: { "questions": 1 } })
    console.log(cursor1);
    const cursor2 = await col2.findOne({ "examid": req.body.examid }, { projection: { "script": 1,"answers":1 } })
    // console.log(cursor2);
    const cursor3 = await col3.find({ "examid": req.body.examid }, { projection: { "script": 1,"username":1 } }).toArray()
    // console.log(cursor3);
    // console.log(Object.keys(cursor2.answers).length);
    console.log(cursor1.questions.length);
    console.log(cursor1.questions.length == Object.keys(cursor2.answers).length);
    if (cursor1.questions.length != Object.keys(cursor2.answers).length) {
      res.send({ "status": "error", "message": "You did not upload all correct answers, not possible for evaluation" })
    }
    else {
      var response=await EvaluateNLP(cursor2, cursor3)
      console.log(response);
      res.send({ "status": "success", "message": "Success ",...response })
    }

  }
  catch (error) {
    console.log(error);
    res.send({ "status": "error", "message": "Try again after sometime: " + error })
  }
})
async function EvaluateNLP(cursor2, cursor3) {
  var request = await fetch("http://127.0.0.1:5000/evaluateScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ "profanswers": cursor2, "useranswers": cursor3 })
  })
  var response = await request.json()
  console.log(response)
  return response
  
}
app.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
    const database = client.db("Capstone_2");
    const col1 = database.collection(req.body["role"] + "s");
    const query = { "username": req.body["username"] };
    const cursor = await col1.findOne(query);
    console.log(cursor)
    if (cursor == null) {
      const result = await col1.insertOne(req.body);

      res.send({ "status": "success", "message": "Succesfully signed up. Please Login" })
    }
    else {
      res.send({ "status": "success", "message": "User already present. Please Login" })
    }
  }
  catch (error) {
    res.send({ "status": "error", "message": "Try again after sometime: " + error })
  }

})
app.post("/postResult",async(req,res)=>{
  try {
    await client.connect();
    const database = client.db("Capstone_2");
    const col1 = database.collection("exams");
    const query = { "_id": new ObjectId(req.body["examid"]) };
    const cursor = await col1.updateOne(query,{$set:{"results":req.body.results}});
    res.send({ "status": "success", "message": "Succesfully posted results" })
  }
  catch (error) {
    res.send({ "status": "error", "message": "Try again after sometime: " + error })
  }
})
app.post("/getUserResults",async(req,res)=>{
  try {
    await client.connect();
    const database = client.db("Capstone_2");
    const col1 = database.collection("exams");
    const col2 = database.collection("examUploads");
    console.log(req.body["examid"]);
    console.log(req.body.username);
    const query1 = { "_id": new ObjectId(req.body["examid"]),[`results.${req.body.username}`]: { $exists: true } };
    const query2= { "examid": req.body["examid"],username:req.body.username };
    const cursor1 = await col1.findOne(query1);
    const cursor2 = await col2.findOne(query2);
    console.log(cursor1);
    console.log(cursor2);
    if(cursor1==null || cursor2==null){
      res.send({ "status": "error", "message": "Papers not yet graded. Please check later"})
    }
    else{
      res.send({ "status": "success", "message": "Succesfully got results","results":cursor1.results,"scripts":cursor2.answers })
    }
    
  }
  catch (error) {
    res.send({ "status": "error", "message": "Try again after sometime: " + error })
  }
})
app.post("/addexam", async (req, res) => {
  try{
    await client.connect();
    const database = client.db("Capstone_2");
    const col1 = database.collection("exams");
    const result=await col1.insertOne(req.body);
    res.send({ "status": "success", "message": "Exam Posted Succesfully"})
  }
  catch(error){
    res.send({ "status": "error", "message": "Error: "+error})
    console.log(error);
  }
})
app.post('/login', async (req, res) => {
  // res.send('Login!')
  try {
    console.log(req.body)
    await client.connect();
    const database = client.db("Capstone_2");
    const col1 = database.collection(req.body["role"] + "s");
    const query = { "username": req.body["username"] };

    const cursor = await col1.findOne(query);
    console.log(cursor)
    if (cursor == null) {
      res.send({ "status": "error", "message": "User not present. Please Sign Up." })
    }
    else if (cursor["password"] != req.body["password"]) {
      res.send({ "status": "error", "message": "Password NOT matched. Please check." })
    }
    else if (cursor["password"] == req.body["password"] && cursor["role"] == req.body["role"]) {
      res.send({ "status": "success", "message": "Succesfully logged in.", ...cursor })
    }
    else {
      res.send({ "status": "error", "message": "InCorrect user" })
    }
  }
  catch (error) {
    res.send({ "status": "error", "message": "Try again after sometime: " + error })
  }
})
app.post("/getProfessorExams", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("Capstone_2");
    const col1 = db.collection("exams");
    const updatedDocuments = [];
    console.log(req.body);
    console.log("USERNAME: ");
    console.log(req.body["username"]);
    const cursor = await col1.find({ "professorID": req.body["username"] }).toArray()
    console.log("Exams are: " + cursor);
    for (const document of cursor) {
      const col2 = db.collection("examUploads");
      const cursor2 = await col2.find({ "examid": document._id.toString() }).toArray();

      const updatedDocument = {
        ...document,
        "submissions": cursor2,
      };

      updatedDocuments.push(updatedDocument);
    }
    console.log("updateddocs");
    console.log(updatedDocuments);
    res.send(JSON.stringify(updatedDocuments));
  }
  catch (error) {
    console.log(error);
    res.send([])
  }
})
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
first()
// MongoClient.connect("mongodb://127.0.0.1:27017/Capstone_2", function (err, db) {
//   if (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
//   console.log("connected-1");
//   assert.equal(null, err);
//   assert.ok(db != null);
//   console.log("connected");
//   db.collection("test").update({ a: 1 }, { b: 1 }, { upsert: true }, function (err, result) {
//     assert.equal(null, err);
//     assert.equal(1, result);
//     console.log("updated");
//     db.close();
//   });
// });


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})