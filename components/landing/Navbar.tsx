import React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 40px',
      }}
    >
      <div>
        <Image
          src="https://parrotpos.my/assets/images/logo_full.png"
          alt="logo"
          height={50}
          width={120}
        />
      </div>

      <div style={{ display: 'flex', columnGap: 20, alignItems: 'center' }}>
        <Button sx={{ color: 'gray' }} variant="text">
          Home
        </Button>
        <Button sx={{ color: 'gray' }} variant="text">
          How it works
        </Button>
        <Button sx={{ color: 'gray' }} variant="text">
          Help Center
        </Button>
        <Button
          sx={{ borderRadius: 3, height: 40, width: 100 }}
          color="success"
          variant="outlined"
        >
          Login
        </Button>
        <Button
          sx={{ borderRadius: 3, height: 40, width: 100 }}
          color="success"
          variant="contained"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
