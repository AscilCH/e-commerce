  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
  import Profile from '../../../pages/profile';


  export default function AccountPopover({ loggedInUser }) {
    
    const [open, setOpen] = React.useState(null);

    const handleOpen = (event) => {
      setOpen(event.currentTarget);
    };

    const handleClose = () => {
      setOpen(null);
    };

    const handleProfileClick = () => {
      console.log('loggedInUser dans AccountPopover:', loggedInUser);
      window.location.href = '/dashboard/profile';
    };

    const handleLogout = () => {
      localStorage.removeItem('accessToken'); 
      window.location.href = '/login';
    };
    if (!loggedInUser) {
      return null;
    }
    return (
      <>
          <IconButton onClick={handleOpen}>
          {loggedInUser?.admin ? (
            <Avatar src={loggedInUser.admin.photoURL} alt="admin" />
          ) : (
            <Avatar alt="admin" />
          )}
        </IconButton>
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: {p: 0,mt: 1.5,
              ml: 0.75,width: 180,'& .MuiMenuItem-root': {typography: 'body2',borderRadius: 0.75,},},}}>
          <Box sx={{ my: 1.5, px: 2.5 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2" noWrap style={{ marginRight: '0.5rem' }}>
            {loggedInUser?.admin?.nomad ?? 'No Nom'}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {loggedInUser?.admin?.prenomad ?? 'No Prenom'}
            </Typography>
          </div>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {loggedInUser?.admin?.emailad ?? 'No Email'}
            </Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem component={Link} to="/dashboard/profile" sx={{ m: 1 }}>
          View Profile
        </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            Logout
          </MenuItem>
        </Popover>
      </>
    );
  }
