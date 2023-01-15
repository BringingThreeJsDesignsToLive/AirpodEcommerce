import React from 'react';
import './Style/App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import  Container from 'react-bootstrap/Container';
import  Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header >
          <Navbar bg="white" variant="white">
            <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              <LinkContainer style={{display: 'block'}} to="/">
                <Navbar.Brand className='nav'>
                  earbeats
                </Navbar.Brand>
              </LinkContainer>
              <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
              <LinkContainer to="/">
                <Nav.Link className='nav'>
                  Earbuds
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/">
                <Nav.Link className='nav'>
                  Headphones
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link className='nav'>
                  Accessories
                </Nav.Link>
              </LinkContainer>
              </Container>
            </Container>
          </Navbar>
        </header>
        <div className="product">
          <Container>
            <span id='heading'>Senneiser</span>
            <h1 id='sub-heading'>Wireless N7007</h1>
            <span id='product-details'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
            <LinkContainer to="/">
              <span id='link-product'>EXPLORE PRODUCT</span>
            </LinkContainer>
          </Container>    
        </div>
        <div>
            <Container className='gradient-background'>
              
            </Container>
        </div>
        <div className='paginator'>
          <span>01/05</span>
        </div>
        <Container>
          <footer className='foot-bs'>
              All rights reserved    
          </footer>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
