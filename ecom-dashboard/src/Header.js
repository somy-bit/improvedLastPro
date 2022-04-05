import React from 'react';
import { Container, NavDropdown } from 'react-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


function Header(props) {

    let page = props.inpage;
    let user = JSON.parse(localStorage.getItem('userinfo'));
    const navigate = useNavigate();

    function logout() {

        localStorage.clear();
        navigate('/register');

    }

    function callback(chidata) {

        props.callback(chidata);

    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto navbar-item-margin">
                        {
                            localStorage.getItem('userinfo') ?
                                <>
                                    <Link to="/"><h6 className={page === 'list' ? 'linkText' : ''} >Produtc List</h6></Link>
                                    <Link to="/add"><h6 className={page === 'add' ? 'linkText' : ''} >Add Product</h6></Link>

                                </>
                                :
                                <>

                                    <Link to="/login"><h6 className={page === 'login' ? 'linkText' : ''} >Login</h6></Link>
                                    <Link to="/register"><h6 className={page === 'reg' ? 'linkText' : ''} >Register</h6></Link>
                                </>
                        }

                    </Nav>
                    {page === 'list' ?
                        <Nav>
                            <SearchBar callParent={callback} />
                        </Nav>
                        :
                        null
                    }


                    {localStorage.getItem('userinfo') ?
                        <Nav>
                            <NavDropdown title={user && user.name}>
                                <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        :
                        null
                    }

                </Container>
            </Navbar>
        </div>
    )
}

export default Header
    ;