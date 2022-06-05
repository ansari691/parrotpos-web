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
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { COLORS } from '../../constants/colors';
import { useSnackAlert } from '../../hooks/useSnackAlert';
import * as Yup from 'yup';

export const ErrorHelperText = ({ error }: any) => {
  return (
    <Typography
      style={{
        position: 'absolute',
        left: 0,
        bottom: -23,
        width: '100%',
        textAlign: 'left',
        paddingLeft: 16,
      }}
      color={'#d32f2f'}
      variant="caption"
    >
      {error}
    </Typography>
  );
};

const RegisterBox1 = ({ currentPage, setCurrentPage }: any) => {
  const router = useRouter();
  const showSnackAlert = useSnackAlert();

  const formikProps = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    },
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post(
          'https://gateway.dev.parrotpos.com.my/accounts/no-auth/signup',
          {
            country_iso: 'MY',
            country_code: '6',
            email: formikProps.values.email,
            password: formikProps.values.password,
            phone_number: formikProps.values.phone_number,
            name: formikProps.values.name,
          }
        );
        localStorage.setItem('ppwSessionId', response.data.session_id);
        console.log(response);
        if (response.data.message === 'OTP Sent for Email Verification') {
          setCurrentPage(2);
          router.replace(
            `?referralCode=${router.query.referralCode}&email=${formikProps.values.email}`,
            undefined,
            {
              shallow: true,
            }
          );
          showSnackAlert('success', 'OTP sent successfully!');
          actions.resetForm();
        } else {
          showSnackAlert('error', response.data.message);
        }
      } catch (error) {
        alert('user creation failed');
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().label('User name').required(),
      email: Yup.string().label('Email').email().required(),
      phone_number: Yup.string().label('Phone Number').min(10).required(),
      password: Yup.string()
        .test(
          'passedRegex',
          'Uppercase, Lowercase and number required',
          //@ts-ignore
          (value) => value?.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
        )
        .label('Password')
        .min(8)
        .max(20)
        .required(),
      confirmPassword: Yup.string()
        .label('Confirm Password')
        .required()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
  });

  return (
    <Paper
      elevation={3}
      sx={{
        px: 3,
        py: 4,
        borderRadius: 6,
        maxWidth: 620,
        // minWidth: 450,
        maxHeight: 1000,
      }}
    >
      <form onSubmit={formikProps.handleSubmit}>
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
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          error={Boolean(formikProps.touched.name && formikProps.errors.name)}
          helperText={formikProps.touched.name && formikProps.errors.name}
          name="name"
          size="small"
          fullWidth
          id="outlined-basic"
          placeholder="Enter username"
          variant="outlined"
        />

        <p style={{ marginBottom: 0 }}>Email*</p>

        <TextField
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          error={Boolean(formikProps.touched.email && formikProps.errors.email)}
          helperText={formikProps.touched.email && formikProps.errors.email}
          name="email"
          size="small"
          fullWidth
          id="outlined-basic"
          placeholder="Enter Email"
          variant="outlined"
        />

        <p style={{ marginBottom: 0 }}>Phone Number*</p>
        <TextField
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          error={Boolean(
            formikProps.touched.phone_number && formikProps.errors.phone_number
          )}
          helperText={
            formikProps.touched.phone_number && formikProps.errors.phone_number
          }
          name="phone_number"
          size="small"
          fullWidth
          id="outlined-basic"
          placeholder="Enter Phone Number"
          variant="outlined"
        />

        <p style={{ marginBottom: 0 }}>Password*</p>

        <div
          style={{
            position: 'relative',
            flexDirection: 'column',
            marginBottom: formikProps.errors.password ? 32 : 0,
          }}
        >
          <OutlinedInput
            size="small"
            fullWidth
            name="password"
            id="outlined-basic"
            placeholder="Create a password"
            style={{ maxWidth: 400 }}
            type={formikProps.values.showPassword ? 'text' : 'password'}
            value={formikProps.values.password}
            onChange={formikProps.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    formikProps.setValues({
                      ...formikProps.values,
                      showPassword: !formikProps.values.showPassword,
                    })
                  }
                  edge="end"
                >
                  {formikProps.values.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />

          {Boolean(
            formikProps.touched.password && formikProps.errors.password
          ) && <ErrorHelperText error={formikProps.errors.password} />}
        </div>

        <p style={{ marginBottom: 0 }}>Confirm Password*</p>

        <div
          style={{
            position: 'relative',
            flexDirection: 'column',
            marginBottom: formikProps.errors.password ? 32 : 0,
          }}
        >
          <OutlinedInput
            size="small"
            fullWidth
            name="confirmPassword"
            id="outlined-basic"
            placeholder="Confirm password"
            style={{ maxWidth: 400 }}
            // helperText="Must be atleast 8 characters"
            type={formikProps.values.showConfirmPassword ? 'text' : 'password'}
            value={formikProps.values.confirmPassword}
            onChange={formikProps.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    formikProps.setValues({
                      ...formikProps.values,
                      showConfirmPassword:
                        !formikProps.values.showConfirmPassword,
                    });
                  }}
                  edge="end"
                >
                  {formikProps.values.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {Boolean(
            formikProps.touched.confirmPassword &&
              formikProps.errors.confirmPassword
          ) && <ErrorHelperText error={formikProps.errors.confirmPassword} />}
        </div>

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
            type="submit"
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
      </form>
    </Paper>
  );
};

export default RegisterBox1;
