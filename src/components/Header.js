import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';

const Header = () => {
    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate();

    // const [hideHeader, setHideHeader] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
        toast.success('Logout Successfully!!!');
    };
    // let token = localStorage.getItem('token');

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/login');
    //     }
    // }, []);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logoApp}
                            width={30}
                            height={30}
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        <span>Test App</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {user && user.auth && (
                            <>
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/">
                                        Home
                                    </NavLink>
                                    <NavLink className="nav-link" to="/users">
                                        Manage Users
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.auth === true && (
                                        <span className="nav-link">Welcome, ${user.email}</span>
                                    )}
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        {user && user.auth === true ? (
                                            <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                        ) : (
                                            <NavLink className="dropdown-item" to="/login">
                                                Login
                                            </NavLink>
                                        )}
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
