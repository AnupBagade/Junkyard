import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const JunkYardHeader = (props) => {
  return(
    <Navbar bg="dark" variant="dark" fixed="top" data-test="header-navbar">
      <Navbar.Brand href="#home" style={{font:"16", fontFamily:"Rock Salt"}} data-test="app-title">JunkYard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        <Form inline>
          <Nav className="mr-auto">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" data-test="header-search-form"/>
            <Button variant="success" data-test="header-search-button">Search</Button>
            <Nav.Link href="#home" data-test="header-orders-link">Orders</Nav.Link>
            <Nav.Link href="#link" data-test="header-cart-link">Cart</Nav.Link>
            <NavDropdown title="My Account" data-test="header-my-account-dropdown">
              <NavDropdown.Item href="#action/3.1" data-test="my-account-action">Action</NavDropdown.Item>
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

export default JunkYardHeader;
