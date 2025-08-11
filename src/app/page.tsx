"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Shared styles
import layoutStyles from "@/styles/layouts/page.module.css";
import buttonStyles from "@/styles/components/buttons.module.css";
import typographyStyles from "@/styles/utilities/typography.module.css";

// Page-specific styles
import styles from "./page.module.css";

export default function Home(): React.JSX.Element {
  const [time, setTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const updateTime = (): void => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={layoutStyles.pageGrid}>
      <main className={layoutStyles.main}>
        <h1 className={typographyStyles.tabularNums}>{!isMounted ? null : time}</h1>
      </main>
      <footer className={layoutStyles.footer}>
        <div className={buttonStyles.buttonGroup}>
          <Link href="/next" className={buttonStyles.secondary}>
            <Image
              className={typographyStyles.logo}
              src="/next.svg"
              alt="Next.js logo"
              width={90}
              height={19}
              priority
            />
          </Link>
          <Link href="/start" className={buttonStyles.secondary}>
            Start →
          </Link>
        </div>
      </footer>
    </div>
  );
}
