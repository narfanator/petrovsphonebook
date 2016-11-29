import protests from '../data/protests' //TODO: Not the best pattern. Move in here, or into pure JSON, or...
import { MongoClient, ObjectID } from 'mongodb'

import assert from 'assert'

const db_url = process.env.database//'mongodb://database:27017/petrov' //Docker magic! //'mongodb://localhost:27017/myproject'

MongoClient.connect(db_url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const collection = db.collection('protests');

  protests.map(function(protest, i){
    collection.update({"name": protest.name}, protest, { upsert: true }, function(err, res) {
      assert.equal(null, err);
      console.log(res.result)
    });
  })

  db.close();
});
