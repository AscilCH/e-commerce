import React, { useState } from 'react';
import {
  Link,
  Stack,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Checkbox,
  Modal,
  Box
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Iconify from '../../../components/iconify';

function LoginForm({ setLoggedInUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [isFormWhiteBackground, setIsFormWhiteBackground] = useState(false); // Track white background state
  const { handleSubmit, register, reset } = useForm();

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3002/api/admins/login', formData);
      console.log('Login successful:', response.data);
      handleLoginSuccess(response.data);
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserModalClose = () => {
    setUserModalOpen(false);
    setIsFormWhiteBackground(false); // Reset white background when modal is closed
  };

  const handleRegister = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3002/api/admins/register', formData);
      console.log('User registered:', response.data);
      reset();
      setUserModalOpen(false);
      setIsFormWhiteBackground(false); // Reset white background after registration
    } catch (error) {
      console.error('User registration failed:', error);
      setError('User registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserModalOpen = () => {
    setUserModalOpen(true);
    setIsFormWhiteBackground(true); // Set white background when modal is open
  };

  const handleLoginSuccess = async (user) => {
    setLoggedInUser(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  return (
    <Box
    sx ={{ 
          paddingLeft:'5vh'

  }}
    >
      <form onSubmit={handleSubmit(handleLogin)}  >
        <Stack spacing={2} sx={{ maxWidth: '400px', width: '100%' }}>
          <TextField {
            ...register('emailad')} 
            label="Email address" 
            type="email"  
    > salem</TextField>
          <TextField
            {...register('passwordad')}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <div>
              <Checkbox {...register('remember')} />
              <span>Remember me</span>
            </div>
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
            <Link onClick={handleUserModalOpen} variant="subtitle2" underline="hover">
              Register
            </Link>
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Log In
          </LoadingButton>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Stack>
      </form>
      <Modal open={userModalOpen} onClose={handleUserModalClose}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            ...(isFormWhiteBackground && { backgroundColor: 'white', padding: '20px' }), // Conditionally apply the white background
          }}
        >
          <h2>Register User</h2>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Stack spacing={2}>
              <TextField {...register('nomad')} label="Nom" />
              <TextField {...register('prenomad')} label="Prenom" />
              <TextField {...register('telad')} label="Tel" />
              <TextField {...register('emailad')} label="Email" />
              <TextField {...register('passwordad')} label="Password" type="password" />
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default LoginForm;
