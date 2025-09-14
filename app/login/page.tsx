'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    // 環境に応じてリダイレクトURLを設定
    const isProduction = typeof window !== 'undefined' && 
      window.location.hostname !== 'localhost' && 
      !window.location.hostname.includes('github.dev');
    
    const redirectUrl = isProduction 
      ? 'https://wellness-app.vercel.app/auth/callback'
      : window.location.origin + '/auth/callback';
    
    console.log('送信設定:', { email, redirectUrl });
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    
    setLoading(false);
    
    if (error) {
      console.error('送信エラー:', error);
      alert(`エラー: ${error.message}`);
    } else {
      console.log('メール送信成功');
      alert('認証メールを送信しました。メールのリンクをクリックしてログインしてください。');
    }
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