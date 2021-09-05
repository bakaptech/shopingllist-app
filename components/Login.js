import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loadig, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Błąd Logowania');
    }
    setLoading(false);
  }

  return (
    <>
      <Container className="login_container">
        <div className="login_inside_form">
          <Card>
            <Card.Body>
              <h2 className="card_container">Zaloguj Się</h2>
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

                <Button
                  disabled={loadig}
                  className="button_placeholder"
                  type="submit"
                >
                  Zaloguj Się
                </Button>
              </Form>
              <div className="form_container">
                Zapomniałeś Hasła ?{' '}
                <Link to="/forgot-password">Przywracanie Hasła</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="link_container">
            Potrzebujesz konta ? <Link to="/Signup">Zarejstruj Się</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
