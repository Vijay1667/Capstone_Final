const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer');
const app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const port = 3000
app.use(cors({ origin: "*" }))
// Middleware to parse FormData
const upload = multer();
 // This handles FormDat
/////////
const { MongoClient, ServerApiVersion } = require('mongodb');
var ReplSetServers = require('mongodb').ReplSetServers
const uri = "mongodb://127.0.0.1:27017";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async () => {
    await client.connect();
}
app.get('/', async (req, res) => {
    res.send('Hello World!')

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
})


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
            
            res.send({ "status":"success","message": "Succesfully signed up. Please Login" })
        }
        else {
            res.send({ "status":"success","message": "User already present. Please Login" })
        }
    }
    catch(error){
        res.send({"status":"error","message":"Try again after sometime: "+error})
    }
    
})
app.post('/login', async(req, res) => {
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
            res.send({ "status":"error","message": "User not present. Please Sign Up." })
        }
        else if(cursor["password"]!=req.body["password"]){
            res.send({ "status":"error","message": "Password NOT matched. Please check." })
        }
        else if(cursor["password"]==req.body["password"] && cursor["role"]==req.body["role"]){
            res.send({ "status":"success","message": "Succesfully logged in.", ...cursor })
        }
        else{
            res.send({ "status":"error","message": "InCorrect user" })
        }
    }
    catch(error){
        res.send({"status":"error","message":"Try again after sometime: "+error})
    }
})
async function monitorchange(){
    try {
        await client.connect();
        const database = client.db("Capstone_2");
        const collection = database.collection("students");
        // open a Change Stream on the "haikus" collection
        changeStream = collection.watch();
        // set up a listener when change events are emitted
        changeStream.on("change", next => {
          // process any change event
          console.log("received a change to the collection: \t", next);
        });
        console.log("closed the change stream")
      }
      catch(error){
        console.log(error+":>>>>");
      }
}
monitorchange()
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve,ms);
    });
  }
app.post("/upload",upload.array('scripts'),async (req,res)=>{
    var len=req.files.length;
    console.log(req.files);
    // console.log(JSON.parse(JSON.stringify(req.body)))
    await sleep(3000);
    res.send(Array.from({length:len}, () => Math.floor(Math.random() * 10)))
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})