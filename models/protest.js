import _ from 'lodash'
import {Schema, String, Url} from '../models/schema'

export default class Protest {
  constructor(...opts) {
    if(typeof(opts) == "string") {
      //Presume it's a JSON string
      console.log("TODO: Handle JSON string")
    } else if (typeof(opts) == "object") {
      _.defaultsDeep(opts, Protest.defaults)
    }
  }

}

Protest.schema = new Schema({
  name: String,
  website: Url,
  jurisdiction: [String],
  contacts: [{
    name: String,
    list: [{
      people: [String],
    }]
  }],
})
