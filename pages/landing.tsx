import { useMediaQuery } from '@mui/material';
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
          flexWrap: 'wrap',
          justifyContent: 'center',
          rowGap: 50,
        }}
      >
        <div style={{ alignSelf: 'center', flexGrow: 1, textAlign: 'center' }}>
          <Image
            src="/landing/Tablet login-rafiki.png"
            alt="tableGirl"
            width={860}
            height={490}
            //         layout='fill'
            // objectFit='contain'
          />
        </div>
        <div style={{ padding: '0px 50px' }}>
          <RegisterBox />
        </div>
      </div>
    </>
  );
};

export default Landing;
