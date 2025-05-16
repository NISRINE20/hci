import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Form, Title, Label, Input, Select, Button, RedirectText, InputGroup
} from '../Designs/LoginPageDesign'; // Ensure the path is correct

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    program: ''
  });

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch('http://vynceianoani.helioho.st/hci/get_programs.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPrograms(data);
        } else {
          console.error('Invalid program list response');
        }
      })
      .catch(err => console.error('Failed to fetch programs:', err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      program: parseInt(formData.program, 10) || 0 // Ensure program is an integer
    };

    fetch('http://vynceianoani.helioho.st/hci/registration.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Registration successful!');
          setFormData({
            username: '',
            email: '',
            password: '',
            program: ''
          });
          navigate('/'); // Go back to login or home
        } else {
          alert('Error: ' + data.error);
        }
      })
      .catch(err => {
        alert('Network error');
        console.error(err);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>

        <InputGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Program:</Label>
          <Select
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          >
            <option value="">Select a program</option>
            {programs.map(prog => (
              <option key={prog.id} value={prog.id}>{prog.name}</option>
            ))}
          </Select>
        </InputGroup>

        <Button type="submit">Register</Button>

        <RedirectText>
          Already have an account?{' '}
          <a style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Login</a>
        </RedirectText>
      </Form>
    </Container>
  );
};

export default RegisterPage;
