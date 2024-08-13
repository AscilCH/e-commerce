import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import Iconify from '../../../components/iconify';
import AccountPopover from './AccountPopover';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const initialUser = JSON.parse(storedUser);
      setLoggedInUser(initialUser);
      console.log('initialUser:', initialUser);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    console.log(localStorage.setItem('loggedInUser', JSON.stringify(user)))
    setLoggedInUser(user);
  };

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}sx={{mr: 1,color: 'text.primary',display: { lg: 'none' },}}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
        {loggedInUser && <AccountPopover loggedInUser={loggedInUser} />}
      </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
