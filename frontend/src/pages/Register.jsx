import React from 'react';
import { SignUp } from '@clerk/react';

export function RegisterPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-surface-bright py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col items-center justify-center">
        <SignUp fallbackRedirectUrl="/" />
      </div>
    </section>
  );
}

export default RegisterPage;
