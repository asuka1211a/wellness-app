'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Magic Link を踏んだあとに戻るURL
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) alert(error.message);
    else alert('Check your email for the login link!');
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={{ marginRight: 8 }}
      />
      <button onClick={handleLogin}>Send Magic Link</button>
    </div>
  );
}
