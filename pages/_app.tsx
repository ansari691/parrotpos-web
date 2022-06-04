import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material';
import { COLORS } from '../constants/colors';
import { SnackAlert } from '../components/SnackAlert';
import { createContext, useState } from 'react';

const theme = createTheme({
  typography: {
    // fontFamily: ['Helvetica Neue Medium'].join(','),
    h6: {
      fontWeight: 'bold',
    },
  },
  palette: {
    primary: {
      main: '#3E3E3E',
      '100': '#707070',
      '200': '#5BA62F',
      '300': '#85B82B',
    },
    secondary: {
      main: '#5BA62F',
      '100': '#85B82B',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 15px #0000001A',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // fontFamily: ['Helvetica Neue Medium'].join(','),
        },
      },
      defaultProps: {
        variant: 'contained',
        style: {
          backgroundColor: '#59A630',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: COLORS.grey1,
          borderRadius: 15,
          borderColor: COLORS.green,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderRight: '0.1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export const AppContext = createContext<{
  setSnackData: (
    snackData: {
      severity: 'info' | 'error' | 'warning' | 'success';
      message: string;
    } | null
  ) => void;
}>({
  setSnackData: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [snackData, setSnackData] = useState<{
    severity: 'info' | 'error' | 'warning' | 'success';
    message: string;
  } | null>(null);
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          setSnackData,
        }}
      >
      <Component {...pageProps} />
      <SnackAlert snackData={snackData} setSnackData={setSnackData} />
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
