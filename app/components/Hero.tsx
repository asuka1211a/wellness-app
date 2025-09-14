"use client"; // ← アニメーションや JSX スタイルがあるので Client Component にする

import Image from "next/image";
import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={`glass-card ${styles.container}`}>
      <h2 className="wellness-title">心と身体に、癒しと感動を。</h2>
      <p className="wellness-subtitle">
        あなたのウェルネス体験を、もっと美しく、もっと直感的に。
      </p>

      <Image
        src="/file.svg"
        alt="Wellness"
        width={80}
        height={80}
        className={styles.icon}
      />

      <div className={styles.buttons}>
        <Link href="#" className={`wellness-btn ${styles.fadeInUp}`}>
          はじめる
        </Link>
        <Link
          href="#"
          className={`wellness-btn ${styles.fadeInUpSlow}`}
        >
          詳細を見る
        </Link>
      </div>
    </section>
  );
}
