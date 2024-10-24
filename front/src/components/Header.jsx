//react
import React from 'react'

//redux
import { useSelector } from 'react-redux';

//bootstrap
import { LinkContainer } from 'react-router-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {Navbar, Nav, Container, Badge } from 'react-bootstrap'

export default function Header() {
    const {cartItems} = useSelector((state) => state.cart)
  return (
    <header>
        <Navbar bg='dark' variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>Book's Pro</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart/>
                                    {cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                            {cartItems.reduce((a,c) => a+c.qty,0)}
                                        </Badge>)}
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='login'>
                            <Nav.Link><FaUser/>Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
