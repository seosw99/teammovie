import {Button, Navbar, Nav, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function MovieNavbar() {

  let navigate = useNavigate();

    return (
      <div>
        <Navbar bg='dark' data-bs-theme="dark">
          <Container>
            <Navbar.Brand href='#home'>NegaBox</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('/booking')}>Booking</Nav.Link>
              <Nav.Link onClick={() => navigate('/reservation')}>Reservation</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
};

export default MovieNavbar;