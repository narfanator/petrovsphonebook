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
        <Table className={style(styles.table)}>
          <thead>
            <tr>
                <th className={style(styles.th)}>Protest</th>
                <th className={style(styles.th)}>Jurisdiction</th>
            </tr>
          </thead>
          <tbody>
            {
                this.props.protests.map( (protest, i) => (
                    <tr key={i}>
                        <td className={style(styles.td)}>
                          <Link href={`/accont?id=${protest.id}`}>{ protest.name }</Link>
                        </td>
                        <td className={style(styles.td)}>
                          { protest.jurisdiction.join(", ") }
                        </td>
                    </tr>
                ))
            }
         </tbody>
        </Table>
      </div>
    )
  }
}

const styles = {
  th: {
    background: '#00cccc',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: '12px',
    padding: '12px 35px',
  },

  header: {
    font: '15px Monaco',
    textAlign: 'center'
  },

  table: {
    fontFamily: 'Arial',
    margin: '25px auto',
    borderCollapse: 'collapse',
    border: '1px solid #eee',
    borderBottom: '2px solid #00cccc'
  },

  td: {
    color: '#999',
    border: '1px solid #eee',
    padding: '12px 35px',
    borderCollapse: 'collapse'
  },

  list: {
    padding: '50px',
    textAlign: 'center'
  },

  photo: {
    display: 'inline-block'
  },

  photoLink: {
    color: '#333',
    verticalAlign: 'middle',
    cursor: 'pointer',
    background: '#eee',
    display: 'inline-block',
    width: '250px',
    height: '250px',
    lineHeight: '250px',
    margin: '10px',
    border: '2px solid transparent',
    ':hover': {
      borderColor: 'blue'
    }
  }
}
