'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Magic Linkからのリダイレクトをチェック
  useEffect(() => {
    if (window.location.hash.includes('access_token')) {
      // アクセストークンがある場合はダッシュボードにリダイレクト
      router.replace('/dashboard');
    }
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://wellness-app.vercel.app/login',
      },
    });
    setLoading(false);
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
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Sending...' : 'Send Magic Link'}
      </button>
    </div>
  );
}