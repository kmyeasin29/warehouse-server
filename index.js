const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

//carLeader
//GOYiMjghXPVxsfmA
//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwbwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const carCollection = client.db("carLeader").collection("cars");
    app.get("/car", async (req, res) => {
      const query = {}
      const cursor = carCollection.find(query);
      const cars = await cursor.toArray();

      res.send(cars);
    });

    app.get('/car/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await carCollection.findOne(query);
      res.send(car)
    })

    // Upload Product
    app.post('/car', async (req, res) => {
      const item = req.body;
      const result = await carCollection.insertOne(item);
      res.send(result);
    });

    //Updet Item
    

    // Delete product
    app.delete('/car/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await carCollection.deleteOne(query);
      res.send(result);
    })

  }
  finally {

  }
}
run().catch(console.dir)



app.get('/', (req, res) => {
  res.send('car leader is running')
});

app.listen(port, () => {
  console.log('car leader is listening');
})