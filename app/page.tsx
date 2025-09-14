
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

useEffect(() => {
  const handleAuth = async () => {
    console.log('現在のURL:', window.location.href);
    console.log('Hash部分:', window.location.hash);
    
    // URLフラグメントから直接トークンを取得
    const hashFragment = window.location.hash.substring(1);
    const params = new URLSearchParams(hashFragment);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    
    if (accessToken && refreshToken) {
      console.log('アクセストークンを検出');
      setIsProcessing(true);
      try {
        console.log('セッション設定を開始...');
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
        
        if (error) {
          console.error('認証エラー:', error);
          alert('認証に失敗しました: ' + error.message);
        } else {
          console.log('認証成功');
          // URLフラグメントをクリア
          window.history.replaceState({}, document.title, window.location.pathname);
          // ダッシュボードへリダイレクト
          window.location.href = '/dashboard';
        }
      } catch (err) {
        console.error('予期せぬエラー:', err);
        alert('認証処理中にエラーが発生しました');
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  handleAuth();
}, [router]);

  return (
    <>
      <Header />

      <main
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        {/* Hero コンポーネントに置き換え */}
        <Hero />

        <section
          className="glass-card"
          style={{
            width: "100%",
            maxWidth: "600px",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              fontSize: "1.3rem",
              marginBottom: "1rem",
              color: "#4f8cff",
            }}
          >
            Wellnessアプリの特徴
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "1.05rem",
              color: "#222",
            }}
          >
            <li style={{ marginBottom: "0.7rem" }}>
              ・幻想的なUIで癒しと感動を体験
            </li>
            <li style={{ marginBottom: "0.7rem" }}>
              ・直感的な操作で迷わず使える
            </li>
            <li style={{ marginBottom: "0.7rem" }}>
              ・あなたの健康・心のケアをサポート
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
