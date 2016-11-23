import React from 'react'

import protests from '../data/protests'

import { style } from 'next/css'
import Layout from '../pages/_layout.js'

import { Grid, Row, Col } from 'react-bootstrap'

import * as _ from 'lodash'

export default ({ url: {query: { id } } }) => {
  const protest = _.find(protests, {id: id})
  console.log(protest)

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
                    {console.log(contact)}
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
