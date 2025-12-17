import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <main style={{ padding: 16 }}>
      <RegisterForm />
    </main>
  );
};

export default Register;