import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { COLORS } from '../../constants/colors';

const RegisterBox1 = ({ currentPage, setCurrentPage }: any) => {
  const router = useRouter();

  const [values, setValues] = React.useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
  });

  const registerUser = async () => {
    console.log(values);
    try {
      const response = await axios.post(
        'https://gateway.dev.parrotpos.com.my/accounts/no-auth/signup',
        {
          country_iso: 'MY',
          country_code: '6',
          email: values.email,
          password: values.password,
          phone_number: values.phone_number,
          name: values.name,
        }
      );
      localStorage.setItem('ppwSessionId', response.data.session_id);
      console.log(response);
      if (response.data.message === 'OTP Sent for Email Verification') {
        setCurrentPage(2);
        router.replace(`/?email=${values.email}`, undefined, { shallow: true });
        alert('user created successfully');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('user creation failed');
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        px: 3,
        py: 4,
        borderRadius: 6,
        maxWidth: 620,
        // minWidth: 450,
        heigth: '80vh',
      }}
    >
      <Typography
        style={{ color: COLORS.green, marginBottom: 0, fontSize: 22 }}
      >
        Welcome to Parrotpos
      </Typography>
      <Typography sx={{ mt: 0, color: COLORS.grey }}>
        Sign up with referral code to get{' '}
        <span style={{ color: COLORS.green }}>RM10</span> for your friend !
      </Typography>

      <p style={{ marginBottom: 0 }}>Username*</p>

      <TextField
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        size="small"
        fullWidth
        id="outlined-basic"
        placeholder="Enter username"
        variant="outlined"
      />

      <p style={{ marginBottom: 0 }}>Email*</p>

      <TextField
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        size="small"
        fullWidth
        id="outlined-basic"
        placeholder="Enter Email"
        variant="outlined"
      />

      <p style={{ marginBottom: 0 }}>Phone Number*</p>
      <TextField
        onChange={(e) => setValues({ ...values, phone_number: e.target.value })}
        size="small"
        fullWidth
        id="outlined-basic"
        placeholder="Enter Phone Number"
        variant="outlined"
      />

      <p style={{ marginBottom: 0 }}>Password*</p>

      <OutlinedInput
        size="small"
        fullWidth
        id="outlined-basic"
        placeholder="Create a password"
        // helperText="Must be atleast 8 characters"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={(e) => {
          setValues({ ...values, password: e.target.value });
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() =>
                setValues({
                  ...values,
                  showPassword: !values.showPassword,
                })
              }
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      <p style={{ marginBottom: 0 }}>Confirm Password*</p>

      <OutlinedInput
        size="small"
        fullWidth
        id="outlined-basic"
        placeholder="Confirm password"
        // helperText="Must be atleast 8 characters"
        type={values.showConfirmPassword ? 'text' : 'password'}
        value={values.confirmPassword}
        onChange={(e) => {
          setValues({ ...values, confirmPassword: e.target.value });
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setValues({
                  ...values,
                  showConfirmPassword: !values.showConfirmPassword,
                });
              }}
              edge="end"
            >
              {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      <div style={{ marginTop: 20 }}>
        <FormControlLabel
          style={{ display: 'flex', alignItems: 'center' }}
          control={<Checkbox defaultChecked />}
          label={
            <Typography sx={{ fontSize: 14 }}>
              I&apos;ve read and agree with
              <span style={{ color: COLORS.green }}> Terms </span> and
              <span style={{ color: COLORS.green }}> Privacy Policy </span>
            </Typography>
          }
        />
        <Button
          onClick={() => registerUser()}
          fullWidth
          sx={{
            mt: 1,
            background: `transparent linear-gradient(180deg, #F8F8F9 0%, #1B75BB 0%, #2B388F 100%) 0% 0% no-repeat padding-box`,
            borderRadius: 3,
          }}
          variant="contained"
        >
          Sign up
        </Button>
      </div>
    </Paper>
  );
};

export default RegisterBox1;
