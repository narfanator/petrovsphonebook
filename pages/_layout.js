import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Nav, NavItem, NavDropdown, MenuItem, Navbar } from 'react-bootstrap'

import AuthService from '../utils/AuthService'

//TODO: NOT the correct way to handle this, exactly

export default class Layout extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loggedIn: false }
  }

  componentDidMount() {
    this.auth = new AuthService('QM4fCvKbYvMDTwnD0zw3DzRzwcITZpBh', 'rangerscience-testing.auth0.com');
    this.setState({ loggedIn: this.auth.loggedIn() })
    // instance of Lock
    this.lock = this.auth.getLock();
    this.lock.on('authenticated', () => {
      this.setState({ loggedIn: this.auth.loggedIn() })
    });
  }

  login() {
    this.auth.login();
  }

  render () {
    const loginButton = this.state.loggedIn ? <div>Logged In</div> : <button onClick={this.login.bind(this)}>Login</button>;

    return (
      <div>
        <Head>
          <title>Petrovs Phonebook</title>

          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <link rel="stylesheet" type="text/css" href="/static/bootstrap-3.3.7-dist/css/bootstrap.css" />
          <link rel="stylesheet" type="text/css" href="/static/bootstrap-3.3.7-dist/css/bootstrap-theme.css" />

        	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css" />

        </Head>

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>

            <Navbar.Brand>
              <Link href="/">Petrovs Phonebook</Link>
            </Navbar.Brand>

            <Navbar.Toggle />

            <Navbar.Collapse>
              <Nav>
                <NavItem componentClass='div'>
                  <Link href="/protests">
                    Protests
                  </Link>
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={2} href="#">
                    <script src="https://cdn.auth0.com/js/lock/10.5/lock.min.js"></script>
                    { loginButton }
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar.Header>
        </Navbar>

      </div>
    )
  }
}
