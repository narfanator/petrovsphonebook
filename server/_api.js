import Micro from 'micro'
import protests from '../data/protests'
import { MongoClient, ObjectID } from 'mongodb'
import QueryString from 'querystring'

import assert from 'assert'

const db_url = 'mongodb://localhost:27017/myproject'

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

  if(req.url == "/favicon.ico") {
    Micro.send(res, 200)
  } else {

    // host.com/protests -> {collection: protests, params: {}}
    // host.com/protests/show?id=6 -> {collection: protests, params: {i: 6}}
    const collection = req.url.split("/")[1]
    const params = QueryString.parse(req.url.split("?")[1])
    if(params._id) {
      params._id = ObjectID.createFromHexString(params._id)
    }

    const db = await MongoClient.connect(db_url)
    const docs = await db.collection(collection).find(params).toArray()
    Micro.send(res, 200, docs)
    db.close()
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
