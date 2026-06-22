import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import App from './App';
import { AppProviders } from './app/providers';
import './index.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Debug logging
console.log('ENV:', import.meta.env);
console.log('CLERK KEY:', import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

if (!clerkPubKey) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">
      <AppProviders>
        <App />
      </AppProviders>
    </ClerkProvider>
  </React.StrictMode>,
);
