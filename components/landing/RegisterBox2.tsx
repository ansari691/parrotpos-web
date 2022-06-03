import { Button, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { COLORS } from '../../constants/colors';
import { useRouter } from 'next/router';

const RegisterBox2 = ({ currentPage, setCurrentPage }: any) => {
  const router = useRouter();
  return (
    <Paper
      elevation={3}
      sx={{
        px: 4,
        py: 2,
        borderRadius: 6,
        maxWidth: 620,
        // minWidth: 450,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80vh',
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
        <Typography sx={{ pl: 1 }}>Back</Typography>
      </div>
      <div>
        <Image
          src="/landing/Mailbox-amico.png"
          alt="mailbox"
          height={200}
          width={180}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <Typography>An OTP has been sent to</Typography>
        <Typography textAlign={'center'}>{router.query.email}</Typography>
      </div>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        sx={{
          mt: 5,
          background: `transparent linear-gradient(180deg, #F8F8F9 0%, #1B75BB 0%, #2B388F 100%) 0% 0% no-repeat padding-box`,
          borderRadius: 3,
        }}
        fullWidth
      >
        ENTER OTP
      </Button>
    </Paper>
  );
};

export default RegisterBox2;
