import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ModalContextProvider } from '../components/Modal/ModalContext';
import { AuthContextProvider } from '../context/AuthContext';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import ProtectedRoute from '../components/User/ProtectedRoute';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ModalContextProvider>
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        </ModalContextProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
