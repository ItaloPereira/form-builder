import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';

import { AppProvider } from '@/context/AppProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
