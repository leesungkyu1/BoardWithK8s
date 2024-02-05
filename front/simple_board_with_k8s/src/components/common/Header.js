import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({token}) => {

    const headerLink = {
        join: "/memberJoin",
        login: "/login"
    };

    return <>
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="#">SimpleBoardWithK8s</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/">Home</Nav.Link>
                    {token && <Nav.Link href="#action2">글쓰기</Nav.Link>}
                </Nav>
                <Form className="d-flex">
                    {!token && 
                        <>
                            <Button 
                                variant="outline-success"
                                href={headerLink.login}
                            >
                                로그인
                            </Button>
                            <Button 
                                variant="outline-success"
                                href={headerLink.join}
                            >
                                회원가입
                            </Button>
                        </>
                    }
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
};

export default Header;