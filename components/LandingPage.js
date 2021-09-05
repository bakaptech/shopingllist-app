import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';

export default function LandingPage() {
  return (
    <div className="landingpage">
      <Navbar className="navbar" />
      <Container className="user-container">
        <h1>
          Witamy na Stronie z aplikacją pomagającą w zakupach. Stwórz listę
          zakupową i wydawaj mniej miłego korzystania.
        </h1>
      </Container>
    </div>
  );
}
