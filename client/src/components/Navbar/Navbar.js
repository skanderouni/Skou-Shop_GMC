import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function Navbar() {
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            to='/'
            sx={{ fontSize: 24 }}
          >
            {'SkouShop'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color='inherit'
              variant='h6'
              underline='none'
              to='/signin'
              sx={rightLink}
            >
              {'Sign In'}
            </Link>
            <Link
              color='inherit'
              variant='h6'
              underline='none'
              to='/cart/:id?'
              sx={rightLink}
            >
              {'Cart'}
            </Link>
            <Link
              color='inherit'
              variant='h6'
              underline='none'
              to='/register'
              sx={{ ...rightLink }}
            >
              {'Sign Up'}
            </Link>
            <Link to='/profile'>Profile</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Navbar;
