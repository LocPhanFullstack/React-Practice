import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction';

const Header = () => {
    const user = useSelector((state) => state.user.account);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [hideHeader, setHideHeader] = useState(true);

    const handleLogout = () => {
        dispatch(handleLogoutRedux());
    };

    useEffect(() => {
        if (user && user.auth === false) {
            navigate('/login');
        }
    }, [user]);

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
