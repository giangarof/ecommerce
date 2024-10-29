//react
import React from 'react'
import { useNavigate } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';

//bootstrap
import { LinkContainer } from 'react-router-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'

//slices
import { useLogoutMutation } from '../slices/userApiSlice';
import {logout} from '../slices/authSlice'

export default function Header() {
    const {cartItems} = useSelector((state) => state.cart)
    const {userInfo} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // console.log(userInfo)

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

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
                        {userInfo ? (
                            <NavDropdown title={userInfo.name}>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='login'>
                                <Nav.Link><FaUser/></Nav.Link>
                            </LinkContainer>
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
