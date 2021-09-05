import React, { useState } from 'react';
import { Card, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Navbar from './Navbar';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLegout() {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Nie udało się wylogować');
    }
  }

  return (
    <>
      <div className="landingpage">
        <Navbar className="navbar" />
        <Container className="user-container">
          <Card>
            <Card.Body>
              <h2 className="card_container">
                Opecnie zalogowany jest użytkownik posługujący się mailem
                <br />
                <p>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <strong>Email </strong>
                  {currentUser.email}
                </p>
              </h2>
              <h3>
                Drogi użytkowniku czy jesteś pewny że chcesz się wylogować ?
                Jeśli nie kliknij w przycisk anuluj a wrócisz do strony głównej
              </h3>
              <Link to="/LandingPage">
                <Button variant="primary" className="form_container">
                  Anuluj
                </Button>
              </Link>
              <div className="form_container">
                <Button variant="primary" onClick={handleLegout}>
                  Wyloguj się
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
