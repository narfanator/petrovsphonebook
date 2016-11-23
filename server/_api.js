import Micro from 'micro'
import protests from '../data/protests'
import { MongoClient } from 'mongodb'
import { Promise } from 'rsvp'

import assert from 'assert'

const db_url = 'mongodb://localhost:27017/myproject';

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


    const parts = req.url.split("/") // ex: "/collection/_id/6" -> ["", "collection"...]
    const collection = parts[1]

    var params = {}
    parts.slice(2).map( (part, i) => {
      // Pair up the elements
      if((i % 2) == 0) {
        params[part] = parts[2+i+1]
      }
    })
    // "/collection/_id/6" => {_id: 6}, "/collection" => {}
    new Promise( (resolve, reject) => (
      database_action((db) =>(
        db.collection(collection).find(params).toArray((err, docs) => {
          if(err != null) {
            console.log("err: " + err)
            reject(err)
          } else {
            console.log("{"+collection+"}("+params+"):"+docs)
            resolve(docs)
          }
        })
      ))
    )).then( (docs) => (
      Micro.send(res, 200, docs)
    ), (err) => (
      Micro.send(res, 500, err)
    ))
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
