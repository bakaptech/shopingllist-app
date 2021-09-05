import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loadig, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Hasła nie są takie same');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Błąd tworzenia konta');
    }
    setLoading(false);
  }

  return (
    <>
      <Container className="login_container">
        <div className="login_inside_form">
          <Card>
            <Card.Body>
              <h2 className="card_container">Zarejstruj się</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Hasło</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Potwierdź Hasło</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={loadig}
                  className="form_container"
                  type="submit"
                >
                  Zarejstruj Się
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="link_container">
            Masz już konto ? <Link to="/login">Zaloguj Się</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
