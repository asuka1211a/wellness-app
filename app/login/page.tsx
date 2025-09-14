'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { APP_URL } from '@/lib/constants';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchanging, setExchanging] = useState(
    typeof window !== 'undefined' && window.location.href.includes('access_token')
  );

  // Magic Linkからのリダイレクトをチェック
  useEffect(() => {
    const handleAuth = async () => {
      const hasToken = window.location.hash && window.location.hash.includes('access_token');
      console.log('認証状態チェック:', { hasToken, hash: window.location.hash });

      if (hasToken) {
        setExchanging(true);
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          console.log('セッション交換結果:', { data, error });

          if (error) {
            console.error('認証エラー:', error);
            alert('認証に失敗しました: ' + error.message);
          } else {
            console.log('認証成功、dashboardへ遷移します');
            router.replace('/dashboard');
          }
        } catch (err) {
          console.error('予期せぬエラー:', err);
          alert('認証処理中にエラーが発生しました');
        } finally {
          setExchanging(false);
        }
      }
    };

    handleAuth();
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${APP_URL}/login`,
      },
    });
    setLoading(false);
    if (error) alert(error.message);
    else alert('メールをチェックしてログインリンクをクリックしてください');
  };

  if (exchanging) {
    return <div style={{ padding: 40 }}>認証中です…</div>;
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