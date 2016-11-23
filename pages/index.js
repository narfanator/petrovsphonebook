import React from 'react'

import protests from '../data/protests'

import { style } from 'next/css'
import Link from 'next/link'
import { Table } from 'react-bootstrap'

import Layout from '../pages/_layout.js'

export default class extends React.Component {

  render () {


    return (
      <div>
        <Layout />
        <h>Petrov's Phonebook</h>
        <p>Petrov's Phonebook is designed to help you figure out who to call when you want the people holding the weapons to stop using them</p>
      </div>
    )
  }
}
