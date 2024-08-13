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
  Box} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Iconify from '../components/iconify';

function LoginForm({setLoggedInUser, onUserUpdate}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3002/api/admins/login', formData);
      console.log('Login successful:', response.data);
      setLoggedInUser(response.data);
      onUserUpdate(response.data);
      console.log(setLoggedInUser(response.data))
      localStorage.setItem('loggedInUser', JSON.stringify(response.data));
    } catch (error) {
      setError("admin login failed");
    } finally {
      setLoading(false);
    }
  };
  const handleUserModalClose = () => {
    setUserModalOpen(false);
  };

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3002/api/admins/register', formData);
      
      console.log('User registered:', response.data);
      reset();
      setUserModalOpen(false);
      formData.password = '';
    } catch (error) {
      console.error('admin registration failed:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      setError('admin registration failed.');
    } finally {
      setLoading(false);
    }
  }    

  const handleUserModalOpen = () => {
    setUserModalOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Stack spacing={3}>
        <TextField {...register('emailad')} label="Email address" type="email" />

        <TextField
          {...register('passwordad')}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showPassword
                        ? 'eva:eye-fill'
                        : 'eva:eye-off-fill'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
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
      <Modal open={userModalOpen} onClose={handleUserModalClose}>
        <Box sx={{ width: 500, bgcolor: 'background.paper', p: 2 }}>
          <h2>Register User</h2>
          <form onSubmit={handleSubmit(handleRegister)}>
            <TextField {...register('nom')} label="Nom" />
            <TextField {...register('prenom')} label="Prenom" />
            <TextField {...register('tel')} label="Tel" />
            <TextField {...register('email')} label="Email" />
            <TextField {...register('password')} label="Password" type="password" />
            <TextField {...register('role')} label="Role" />
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Box>
      </Modal>
    </form>
  );
}

export default LoginForm;
