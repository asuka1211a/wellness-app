'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Magic Link認証後のハッシュからトークンを取得し、セッションをセット
    if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token });
        window.location.hash = '';
      }
    }
    // セッション確認して、いなければ /login へ
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) {
        router.replace('/login');
      } else {
        setEmail(user.email ?? null);
      }
      setLoading(false);
    });
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
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
