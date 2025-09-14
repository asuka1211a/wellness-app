'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Magic Linkで戻ってきたときにトークン処理
  useEffect(() => {
    const handleAuthCallback = async () => {
      // URLフラグメントからトークンを取得
      const hashFragment = window.location.hash.substring(1);
      const params = new URLSearchParams(hashFragment);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      
      if (accessToken && refreshToken) {
        try {
          // セッションを設定
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (!error) {
            // URLフラグメントをクリーンアップ
            window.history.replaceState({}, document.title, window.location.pathname);
            router.replace('/dashboard');
          }
        } catch (error) {
          console.error('Auth error:', error);
        }
      } else {
        // PKCEフローの場合（念のため残しておく）
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (!error) {
          router.replace('/dashboard');
        }
      }
    };
    
    handleAuthCallback();
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