import React from 'react';
import { Link } from 'react-router-dom';
import { useLayoutEffect, useEffect, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoreProviderContext from '../../Context/CoreProviderContext/CoreProviderContext';

const JunkYardHeader = (props) => {

    return(
        <CoreProviderContext.Consumer>
            {({userData}) => {
                console.log(userData)
                return(
                    <Navbar bg="dark" variant="dark" fixed="top" data-test="header-navbar">
                        <Link to='/'><Navbar.Brand style={{font:"16", fontFamily:"Rock Salt"}} data-test="app-title">JunkYard</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto" />
                                <Form inline>
                                    <Nav className="mr-auto">
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" data-test="header-search-form"/>
                                        <Button variant="success" data-test="header-search-button">Search</Button>
                                        <Link to="/orders"><Nav.Link data-test="header-orders-link">Orders</Nav.Link></Link>
                                        <Link to="/cart"><Nav.Link  href="/cart" data-test="header-orders-link">Cart</Nav.Link></Link>
                                        <NavDropdown title="My Account" data-test="header-my-account-dropdown">
                                            <NavDropdown.Item href="#action/3.1" data-test="my-account-action">{userData.isAdmin}</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2" data-test="my-account-another-action">Another action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3" data-test="my-account-something">Something</NavDropdown.Item>
                                            <NavDropdown.Divider data-test="my-account-divider"/>
                                            <NavDropdown.Item href="#action/3.4" data-test="my-account-separated-link">Separated link</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Form>
                        </Navbar.Collapse>
                    </Navbar>
                )
            }

            }
        </CoreProviderContext.Consumer>

  )
}

export default JunkYardHeader;
