'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      console.log('Dashboard: セッション確認開始');
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Dashboard: 現在のセッション状態:', session);
        
        if (!session) {
          console.log('Dashboard: セッションなし、ログインページへリダイレクト');
          window.location.href = '/login';
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        console.log('Dashboard: ユーザー情報:', user);
        
        if (!user) {
          console.log('Dashboard: ユーザー情報なし、ログインページへリダイレクト');
          window.location.href = '/login';
        } else {
          console.log('Dashboard: ユーザー情報取得成功');
          setEmail(user.email ?? null);
        }
      } catch (error) {
        console.error('Dashboard: セッション確認エラー:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Signed in as: <b>{email}</b></p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
