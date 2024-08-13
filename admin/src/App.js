import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import Router from './routes';
import AccountPopover from './layouts/dashboard/header/AccountPopover';

export default function App() {
  // Set a default user in localStorage
  const defaultUser = {
    _id: { $oid: '64ededa3655b19c7167bf7fb' },
    prenom: 'Mohamed',
    nom: 'mouna',
    tel: 789000,
    email: 'mouna@gmail.com',
    password: '$2b$10$w1QKExKnbIe9JIsfw9oEK.FN0oo6js6pJ7B5PlAZRP2aLQraqcDZq',
    role: '0',
    __v: 0,
  };
  localStorage.setItem('loggedInUser', JSON.stringify(defaultUser));

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check if a user is already logged in based on localStorage
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      console.log(storedUser);
      // If a user is found in localStorage, set it as the loggedInUser
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      // If not found, fetch user data from the API
      axios
        .get('http://localhost:3002/api/admins')
        .then((response) => {
          const adminUser = response.data.find((user) => user.admin);

          // Add the admin user to localStorage
          if (adminUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
            setLoggedInUser(adminUser);
          } else {
            console.error('No admin user found in the response.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Router loggedInUser={loggedInUser} />
          {/* Render AccountPopover if a user is logged in */}
          {loggedInUser && <AccountPopover loggedInUser={loggedInUser} />}
          {/* Render Profile component if a user is logged in */}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
