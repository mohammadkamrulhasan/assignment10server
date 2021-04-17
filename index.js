const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors=require('cors');
const bodyParser=require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5055; 


app.use(cors());
app.use(bodyParser.json());

// console.log(process.env.DB_USER);

app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fyzwt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection err',err);
  const productsCollection = client.db("superShop").collection("products");
  // perform actions on the collection object
  console.log('Database connected successfully');

  app.get('/products',(req,res)=>{
    productsCollection.find()
    .toArray((err,items)=>{
      // console.log('From server',items)
      res.send(items)
    })
  })

  app.post('/Admin', (req, res)=>{
    const newProducts=req.body;
    console.log('adding new products',newProducts);
    productsCollection.insertOne(newProducts)
    .then(result=>{
      console.log('Inserted Count',result.insertedCount)
      res.send(result.insertedCount>0)
    })

  })


//   client.close();



});






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})