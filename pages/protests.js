import React from 'react'

import { style } from 'next/css'
import Link from 'next/link'
import { Table } from 'react-bootstrap'

import Layout from '../pages/_layout.js'

import axios from 'axios'

export default class extends React.Component {

  static async getInitialProps () {
    //TODO: Extract out to it's own function, and branch on waiting on the promise based on server / not server
     //Note: It appears that this ONLY gets run on the server! Update: NOPE. Also gets called client side when you navigate to this page
    //Fetch data from server HERE
    //OHSHIT. I think - okay, I think you can use the Docker network name as the HTTP name here,
    // and in the composed containers, it'll fetch from the container, and on the web, it'll fetch from the website
    // WITHOUT any further action on your part! That's genius!
    //Note: We actually want this to be blocking, at least for this component

    return new Promise( (resolve, reject) => (
      axios.get('http://localhost:3001/protests')
        .then((response) => (resolve(response.data)))
        .catch((error) => (reject(error)))
    ))
    .then(
      function(data) { return {protests: data} },
      function(err) { return  {protests: [], error: err} }
    )

    /*
    TODO: Understand async / await, isomorphic-fetch, and look at this code snipped:
    static async getInitialProps(){
    let results = [];
    const res = await request
      .get('http://content.guardianapis.com/search?q=mobile&api-key=test')
      .accept('application/json');

    if (res.ok && res.body.response.status === 'ok') {
      results = res.body.response.results;
    }

    return {
      results,
      loading: false
    }
  }
  */
  }

  render () {
    return (
      <div>
        <Layout />
        <Table>
          <thead>
            <tr>
                <th>Protest</th>
                <th>Jurisdiction</th>
                <th>Protest Website</th>
            </tr>
          </thead>
          <tbody>
            {
                this.props.protests.map( (protest, i) => (
                    <tr key={i}>
                        <td>
                          <Link href={`/protests/show?_id=${protest._id}`}>{ protest.name }</Link>
                        </td>
                        <td>{ protest.jurisdiction.join(", ") }</td>
                        <td><a href={protest.website}>{ protest.website }</a></td>
                    </tr>
                ))
            }
         </tbody>
        </Table>
      </div>
    )
  }
}
