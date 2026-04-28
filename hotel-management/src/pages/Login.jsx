import React, { useState } from 'react';
import { Container, Card, Form, Button, FloatingLabel, InputGroup, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Lock, User, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin123') {
      const userData = {
        name: 'Grand Vista Admin',
        role: 'Manager',
        id: Date.now()
      };

      dispatch(login(userData));
      navigate('/admin/reservations');
    }

    else {
      setError('Invalid credentials! Use admin / admin123');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
      <Card className="shadow-lg border-0 rounded-4" style={{ maxWidth: '420px', width: '100%' }}>
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <div className="bg-dark text-white rounded-circle d-inline-flex p-3 mb-3">
              <ShieldCheck size={32} />
            </div>
            <h2 className="fw-bold text-dark">Staff Portal</h2>
            <p className="text-muted">Grand Vista Management System</p>
          </div>

          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Username Input */}
            <InputGroup className="mb-3">
              <InputGroup.Text className="bg-light border-end-0">
                <User size={18} className="text-muted" />
              </InputGroup.Text>
              <FloatingLabel label="Username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="bg-light border-start-0"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FloatingLabel>
            </InputGroup>

            {/* Password Input */}
            <InputGroup className="mb-4">
              <InputGroup.Text className="bg-light border-end-0">
                <Lock size={18} className="text-muted" />
              </InputGroup.Text>
              <FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="bg-light border-start-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </InputGroup>

            <Button variant="dark" className="w-100 py-3 fw-bold rounded-3 shadow-sm mb-3" type="submit">
              Sign In
            </Button>

            <div className="text-center">
              <small className="text-muted">Forgot password? Contact IT Dept.</small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;