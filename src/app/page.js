"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{time.toLocaleTimeString()}</h1>
      </main>
      <footer className={styles.footer}>
        <div className={styles.ctas}>
          <Link href="/next" className={styles.secondary}>
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js logo"
              width={90}
              height={19}
              priority
            />
          </Link>
        </div>
      </footer>
    </div>
  );
}
