import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap'; 

export default function NavbarComponent() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/home">The Store</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/home" className="nav-link">Home Page</Link>
          </NavItem>
          <NavItem>
            <Link to="/user" className="nav-link">Your Page</Link>
          </NavItem>
          <NavItem>
            <Link to="/cart" className="nav-link">Shopping Cart</Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </div>
    )
}
