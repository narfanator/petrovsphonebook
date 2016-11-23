import React from 'react'
import axios from 'axios'

import { style } from 'next/css'
import Layout from '../../pages/_layout.js'

import { Grid, Row, Col } from 'react-bootstrap'

import * as _ from 'lodash'

export default class extends React.Component {

  static async getInitialProps(req) {
    console.log("getInitialProps")
    console.log(req)

    /*TODO CURRENT:
    Your problem is that you need to search by ObjectID (Which is a hex number)
    rather than ID string. Since your current (silly) method for getting a data request
    is to use the URL path, rather than the query params...

    ...Well anyway. Rethink shit.


    */
    return new Promise( (resolve, reject) => (
      axios.get('http://localhost:3001/protests/_id/'+req.query._id)
        .then((response) => {
          console.log("success")
          resolve(response.data)
        })
        .catch((error) => {
          console.log("error")
          reject(error)
        })
    ))
    .then(
      function(data) { return {protest: data} },
      function(err) { return  {protest: {contacts:[]}, error: err} }
    )
  }

  render() {
    const protest = this.props.protest
    console.log("rendering")
    console.log(this.props)
    return (
      <div>
        <Layout />
        <div>
          <h1>
            Protest: { protest.name }
          </h1>
          <p>Website: <a href={protest.website}>{protest.website}</a></p>
          <p>Jurisdiction: {protest.jurisdiction.join(", ")}</p>
          <h2>Contacts:</h2>
          <Grid>
          {
            protest.contacts.map( (details,i) => (
              <div key={i}>
                <h3>{details.name}</h3>
                <Row>
                {
                  details.list.map( (contact, j) => (
                    <div key={j}>
                      <Col xs={6} md={4}>
                        <h4>{contact.name}</h4>
                        <a href={contact.facebook}>Facebook</a>
                        <p>{contact.phone}</p>
                      </Col>
                    </div>
                  ))
                }
                </Row>
              </div>
            ))
          }
          </Grid>
        </div>
      </div>
    )
  }
}
