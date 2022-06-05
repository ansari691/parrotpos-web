import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import RegisterBox from '../components/landing/RegisterBox';

const Landing = () => {
  return (
    <>
      <div style={{ padding: '20px 30px' }}>
        <Image src="/landing/logo.png" alt="logo" height={50} width={120} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          // ...(useMediaQuery('(max-Width:800px') && { flexWrap:  'wrap' }),
          flexWrap: useMediaQuery('(max-width:1382px)') ? 'wrap' : 'nowrap',
          justifyContent: 'center',
          rowGap: 50,
        }}
      >
        <Box
          hidden={useMediaQuery('(max-width:800px)')}
          sx={{
            // alignSelf: 'center',
            textAlign: 'center',
            maxWidth: 1147,
            maxHeight: 740,
            // flexGrow: 1,
            px: 5,
          }}
        >
          <img
            src="/landing/landing_svg.svg"
            alt=""
            width={'100%'}
            height={'auto'}
          />
        </Box>
        <Box sx={{ px: '3%' }}>
          <RegisterBox />
        </Box>
      </div>
    </>
  );
};

export default Landing;
