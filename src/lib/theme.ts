"use client"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6e45e2',
      light: '#9d75ff',
      dark: '#4c2bb5',
    },
    secondary: {
      main: '#ff6e6c',
      light: '#ff9e9d',
      dark: '#c73e3e',
    },
    background: {
      default: '#0a0e17',
      paper: '#131b2e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3cc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;