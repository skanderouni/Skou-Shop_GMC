import { Typography } from '@mui/material';
import React, { useState } from 'react';

const Rating = () => {
  const [value, setvalue] = useState();
  return (
    <div>
      <Typography component='legend'>Controlled</Typography>
      <Rating
        name='simple-controlled'
        value={value}
        onChange={(event, newValue) => {
          setvalue(newValue);
        }}
      />
    </div>
  );
};

export default Rating;
