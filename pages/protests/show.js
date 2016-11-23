import React from 'react'
import axios from 'axios'
import QueryString from 'querystring'

import { style } from 'next/css'
import Layout from '../../pages/_layout.js'

import { Grid, Row, Col } from 'react-bootstrap'

import * as _ from 'lodash'

export default class extends React.Component {

  static async getInitialProps(req) {
    //TODO: Got to be a way to just grab this from the request object
    const path = req.pathname + "?" + QueryString.stringify(req.query)
    return new Promise( (resolve, reject) => (
      axios.get('http://localhost:3001'+path)
        .then((response) => {
          resolve(response.data[0])
        })
        .catch((error) => {
          console.log("error")
          console.log(error)
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
