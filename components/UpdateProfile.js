import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Navbar from './Navbar';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState('');
  const [loadig, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Hasła nie są takie same');
    }
    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('Nie udało się zaktualizować konta');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="landingpage">
        <Navbar className="navbar" />
        <Container className="user-container">
          {/* <Container className="login_container"> */}
          <div className="login_inside_form">
            <Card>
              <Card.Body>
                <h2 className="card_container">Edytuj Profil</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      required
                      defaultValue={currentUser}
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      required
                      placeholder="zostaw wolne aby nie zmieniać hasła"
                    />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label>Potwierdz Hasło</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      required
                      placeholder="zostaw wolne aby nie zmieniać hasła"
                    />
                  </Form.Group>
                  <Button
                    disabled={loadig}
                    className="button_placeholder"
                    type="primary"
                  >
                    Edytuj
                  </Button>
                </Form>
                <div className="link_container">
                  <Link to="/">Anuluj</Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
        {/* </Container> */}
      </div>
    </>
  );
}
