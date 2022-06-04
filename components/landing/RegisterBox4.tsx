import { Button, Divider, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { COLORS } from '../../constants/colors';

const RegisterBox4 = ({ currentPage, setCurrentPage }: any) => {
  return (
    <Paper
      elevation={3}
      sx={{
        px: 4,
        py: 2,
        borderRadius: 6,
        maxWidth: 620,
        // minWidth: 500,
        minHeight: 630,
        maxHeight: 900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div>
        <Image
          src="/landing/success.png"
          alt="mailbox"
          width={203}
          height={143}
        />
        <Typography
          textAlign={'center'}
          color={COLORS.green}
          style={{ fontSize: 22, marginLeft: 25 }}
        >
          Successful!
        </Typography>
      </div>
      <div>
        <Typography textAlign={'center'} color={COLORS.grey}>
          You may click next to download the app from respective App Store and
          login.
        </Typography>
      </div>
      <Button
        sx={{
          mt: 5,
          mb: 3,
          background: `transparent linear-gradient(180deg, #F8F8F9 0%, #1B75BB 0%, #2B388F 100%) 0% 0% no-repeat padding-box`,
          borderRadius: 3
        }}
        fullWidth
      >
        NEXT
      </Button>

      <div style={{ display: 'flex', marginBottom: 20 }}>
        <Divider color={'red'} />
        Or
        <Divider />
      </div>

      <Image src="/landing/stores.png" alt="mailbox" width={203} height={143} />
    </Paper>
  );
};

export default RegisterBox4;
