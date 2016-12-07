import Micro from 'micro'
import protests from '../data/protests'
import { MongoClient, ObjectID } from 'mongodb'
import QueryString from 'querystring'

import assert from 'assert'

const db_url = 'mongodb://localhost:27017/myproject'

//TODO: Logging, srsly
//TODO: Don't connect per request, that's dumb
// To do this, you need to know how to catch the "close" on srv, so you can close the connection
const database_action = function(callback) {
  MongoClient.connect(db_url, function(err, db) {
    assert.equal(null, err) //TODO: What happens on error?
    callback(db)
    db.close()
  })
}

//TODO: Security token check
const srv = Micro(async function(req, res) {

  //TODO: Not wildcard
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if( req.url == "/favicon.ico" || req.method == "OPTIONS") {
    Micro.send(res, 200)
  } else {
    // host.com/protests -> {collection: protests, params: {}}
    // host.com/protests/show?id=6 -> {collection: protests, params: {i: 6}}
    const collection = req.url.split("/")[1]

    if (req.method == "POST") {
      const data = await Micro.json(req)
      const db = await MongoClient.connect(db_url)
      const r = await db.collection(collection)
        .insertMany(
          data,
          function(error, result) {
            if(error != null) {
              console.log(error)
              Micro.send(res, 500, {error: error, result: result})
            } else {
              console.log(result.ops)
              Micro.send(res, 200, result.ops)
            }
          }
        )
      db.close()
    } else if (req.method == "PUT") {
      const data = await Micro.json(req)
      data[0]._id = ObjectID.createFromHexString(data[0]._id)
      const db = await MongoClient.connect(db_url)

      //TODO: Error checking + handling... such as making sure a "successful" update actually updated the correct number of records
      //TODO: Multiple record handling
      const result = await db.collection(collection).updateOne({_id: data[0]._id}, data[0])
      console.log("update result")
      console.log(res)

      const docs = await db.collection(collection).find({_id: data[0]._id}).toArray()
      Micro.send(res, 200, docs)

      db.close
    } else if (req.method == "GET") {

      const params = QueryString.parse(req.url.split("?")[1])
      if(params._id) {
        params._id = ObjectID.createFromHexString(params._id)
      }

      const db = await MongoClient.connect(db_url)
      const docs = await db.collection(collection).find(params).toArray()
      console.log(docs)
      Micro.send(res, 200, docs)
      db.close()
    }
  }
})

srv.listen(3001)

export default srv;

/*
db.collection("protests").find({}).toArray(function(err, docs) {
  assert.equal(err, null);
  console.log("Found the following records");
  console.log(docs)
})
*/
