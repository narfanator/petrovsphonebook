
export class Schema {
  constructor(...opts) {
    this.schema = opts[0]
  }

//TODO: Convert the Schema validators return [valid, msg]
  validate(obj) {
    return this.validateObject(obj, this.schema)
  }

  validateArray(arr, schema) {
    const self = this

    if(schema.length > 1) {
      console.log("WARNING: Schema validation does not support multiple element schema arrays")
    }

    if(!(arr instanceof Array)) {
      return "is not an array"
    }

    if(schema instanceof Array) {
      return "WARNING: Schema validation does not support nested schema arrays"
    } else if (typeof(schema) == "object") {
      const res = arr.map(function(elem,i){
        const _res = self.validateObject(elem, schema)
        if(_res.length == 0) {
          return true
        } else if(_res == true) { //This is a weird quirk indicating this could do with a refactor
          return true
        } else {
          return [i + "j", _res]
        }
      }).filter(function(e){return e != true})

      if(res.length == 0) {
        return true
      } else {
        return res
      }
    } else if (typeof(schema) == "undefined"){
      //Nothing to do! Anything can fit here
      return true
    } else {
      const res = arr.map(function(elem,i){
        const [valid, msg] = schema.validate(elem)
        if(!valid) {
          return [i, msg]
        } else {
          return true
        }
      }).filter(function(e){return e != true})

      if(res.length == 0) {
        return true
      } else {
        return res
      }
    }
  }

  validateObject(obj, schema) {
    const self = this //WTF? Why is `this` undef inside the map?

    const res = Object.keys(schema).map(function(key){
      if(obj != null && key in obj) {

        if (schema[key] instanceof Array) {
          const res = self.validateArray(obj[key], schema[key][0])
          if(res != true) {
            return [key, res]
          } else {
            return true
          }
        }

        else if(typeof(schema[key]) == "object") {
          if(obj[key]) {
            const res = self.validateObject(obj[key], schema[key])
            return [key, res]
          } else {
            return [key, "must not be null"]
          }
        }

        else {
          const [valid, msg] = schema[key].validate(obj[key])
          if(!valid) {
            return [key, msg]
          } else {
            return true
          }
        }

      } else {
        return [key, "must be present"]
      }
    }).filter(function(e){return e !== true})

    if(res.length > 0){
      return res
    } else {
      return true
    }
  }
}

export class String {
  static default(){return ""}
  static validate(val){
    if(typeof(val) != "string") {
      return [false, "must be a string"]
    }
    return [true, ""]
  }

  constructor(...opts) {}
}

export class Url {
  static default(){}
  static validate(val){
    if(!/^http/.test(val)) {
      return [false, "not a valid URL "] //TODO: Improve this validation
    } else {
      return [true, ""]
    }
  }

  constructor(...opts) {}
}
