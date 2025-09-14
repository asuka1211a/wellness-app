'use client';
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";

export default function Home() {
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