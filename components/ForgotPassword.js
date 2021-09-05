import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [massage, setMessage] = useState('');
  const [loadig, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Sprawdź emaila po dalsze instrukcje');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <>
      <Container className="login_container">
        <div className="login_inside_form">
          <Card>
            <Card.Body>
              <h2 className="card_container">Resetowanie Hasła</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {massage && <Alert variant="succes">{massage}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Button
                  disabled={loadig}
                  className="button_placeholder"
                  type="submit"
                >
                  Przywróć Hasło
                </Button>
              </Form>
              <div className="form_container">
                <Link to="/login">Zaloguj się</Link>
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
