import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../redux/slices/authSlice";
import { resetState } from "../redux/slices/adminSlice";
import { resetUpdateProfile } from "../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

const Header = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(resetState());
        dispatch(resetUpdateProfile());
    };

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Precious Piranha</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link href="/cart">
                                    <i
                                        className="fas fa-shopping-cart"
                                        style={{ paddingRight: 5 }}
                                    ></i>
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            {user ? (
                                <NavDropdown title={`Hello, ${user.name}`} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link href="/login">
                                        <i className="fas fa-user" style={{ paddingRight: 5 }}></i>
                                        Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {user && user.isAdmin && (
                                <NavDropdown title="Administrative Controls" id="admin-controls">
                                    <LinkContainer to="/admin/users">
                                        <NavDropdown.Item>Manage Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/products">
                                        <NavDropdown.Item>Manage Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orders">
                                        <NavDropdown.Item>Manage Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
