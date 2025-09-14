'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const handleMagicLink = async () => {
      // URLフラグメントからトークンを取得
      const hashFragment = window.location.hash.substring(1);
      const params = new URLSearchParams(hashFragment);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      
      if (accessToken && refreshToken) {
        console.log('マジックリンクトークン検出');
        setProcessing(true);
        
        try {
          // セッションを設定
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            console.error('セッション設定エラー:', error);
            alert('認証に失敗しました: ' + error.message);
          } else {
            console.log('認証成功、ダッシュボードへリダイレクト');
            // URLフラグメントをクリア
            window.history.replaceState({}, document.title, window.location.pathname);
            // ダッシュボードへリダイレクト
            router.replace('/dashboard');
          }
        } catch (error) {
          console.error('認証処理エラー:', error);
          alert('認証処理中にエラーが発生しました');
        } finally {
          setProcessing(false);
        }
      }
    };

    handleMagicLink();
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    
    // 環境に応じてリダイレクトURLを設定
    const isProduction = typeof window !== 'undefined' && 
      window.location.hostname !== 'localhost' && 
      !window.location.hostname.includes('github.dev');
    
    const redirectUrl = isProduction 
      ? 'https://wellness-app.vercel.app/login'
      : window.location.origin + '/login';
    
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

  if (processing) {
    return (
      <div style={{ padding: 40 }}>
        <h1>認証中...</h1>
        <p>しばらくお待ちください</p>
      </div>
    );
  }

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