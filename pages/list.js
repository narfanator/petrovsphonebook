import React from 'react'

import protests from '../data/protests'

import { style } from 'next/css'
import Link from 'next/link'
import { Table } from 'react-bootstrap'

import Layout from '../pages/_layout.js'

export default class extends React.Component {
  static getInitialProps () {
    return { protests: protests }
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
                          <Link href={`/protest?id=${protest.id}`}>{ protest.name }</Link>
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
