import React from 'react';


import TextField from '@mui/material/TextField';

const ProfileScreen = () => {
  return (
    <div className='profile-screen-form'>
      <TextField
        required
        id='FirstName'
        label='Required'
        defaultValue='First Name'
        variant='filled'
        //onChange=
      />
      <TextField
        required
        id='LastName'
        label='Required'
        defaultValue='Last Name'
        variant='filled'
      />
      <TextField
        required
        id='Email'
        label='Required'
        defaultValue='Email'
        variant='filled'
      />
      <TextField
        required
        id='filled-required'
        label='Required'
        defaultValue='Hello World'
        variant='filled'
      />
      <TextField
        required
        id='filled-required'
        label='Required'
        defaultValue='Hello World'
        variant='filled'
      />
    </div>
  );
};

export default ProfileScreen;
