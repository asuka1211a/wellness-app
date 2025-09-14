'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();
  
  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        
        if (error) {
          console.error('認証エラー:', error);
          router.push('/login?error=auth_failed');
        } else {
          console.log('認証成功');
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('予期せぬエラー:', err);
        router.push('/login?error=unexpected');
      }
    };
    
    handleAuth();
  }, [router]);
  
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>認証中...</h1>
      <p>しばらくお待ちください</p>
    </div>
  );
}