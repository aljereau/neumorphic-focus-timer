import React from 'react';
import type { AppProps } from 'next/app';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}

export default MyApp; 