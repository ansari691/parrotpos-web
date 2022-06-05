import { Button, Paper, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { COLORS } from '../../constants/colors';
import axios from 'axios';
import { useSnackAlert } from '../../hooks/useSnackAlert';
import { useRouter } from 'next/router';

const RegisterBox3 = ({ currentPage, setCurrentPage }: any) => {
  const [otp, setOtp] = useState('');
  const showSnackAlert = useSnackAlert();
  const router = useRouter();

  console.log(otp);

  const verifyOtp = async () => {
    try {
      console.log(localStorage.getItem('ppwSessionId'));
      const response = await axios.post(
        'https://gateway.dev.parrotpos.com.my/accounts/no-auth/email-verification',
        {
          session_id: localStorage.getItem('ppwSessionId'),
          otp,
          referral_code: router.query.referralCode,
        }
      );
      if (response.data.status === 200) {
        showSnackAlert('success', 'OTP verified successfully!');
        setCurrentPage(4);
      } else {
        showSnackAlert('error', 'OTP verification failed!');
      }
      console.log(response);
    } catch (error) {
      alert('otp verification failed');
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        px: 4,
        py: 2,
        borderRadius: 6,
        maxWidth: 620,
        minHeight: 630,
        maxHeight: 900,
        display: 'flex',
        flexDirection: 'column',

        // alignItems: 'center',
      }}
    >
      <div
        onClick={() => setCurrentPage(currentPage - 1)}
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          cursor: 'pointer',
          color: COLORS.grey,
        }}
      >
        <ArrowBackIcon />
        <Typography
          onClick={() => setCurrentPage(currentPage - 1)}
          sx={{ pl: 1 }}
        >
          Back
        </Typography>
      </div>

      <div style={{ textAlign: 'left', marginTop: 30 }}>
        <Typography sx={{ color: COLORS.green, fontSize: 22 }}>
          Verify Email ID
        </Typography>
        <Typography style={{ color: COLORS.grey }}>
          Enter OTP sent to your email.
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <OtpInput
          value={otp}
          onChange={(otp: any) => setOtp(otp)}
          //   numInputs={4}
          separator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
          inputStyle={{
            width: 46,
            height: 42,
            borderRadius: 15,
            background: COLORS.grey1,
            color: 'black',
          }}
        />
        {/* {otp.map((item, index) => {
          return (
            <TextField
              key={item}
              sx={{ width: 50, mr: 2 }}
              onKeyDown={(e) => {
                console.log(e.key === 'Delete', e.key === 'Backspace');
              }}
              autoFocus={itemToFocus === index}
              onChange={(e) => {
                // console.log(otp, index)
                console.log(index);
                let tempOtp = otp;
                tempOtp[index] = e.target.value;
                console.log([...tempOtp]);                
                setOtp(otp.slice(0, 1))
                setItemToFocus(1)
                // console.log(e.target.value);
              }}
            />
          );
        })} */}
      </div>
      <Button
        onClick={() => verifyOtp()}
        sx={{
          mt: 5,
          mb: 3,
          background: `transparent linear-gradient(180deg, #F8F8F9 0%, #1B75BB 0%, #2B388F 100%) 0% 0% no-repeat padding-box`,
          borderRadius: 3,
        }}
        fullWidth
      >
        VERIFY
      </Button>
      <Typography textAlign={'center'} sx={{ color: COLORS.grey }}>
        Did not receive OTP in your email ?{' '}
        <span style={{ color: COLORS.green }}>Resend</span>
      </Typography>
    </Paper>
  );
};

export default RegisterBox3;
