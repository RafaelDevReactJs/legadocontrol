import Image from "next/image";
import { ReactNode } from "react";
import styles from "../page.module.css";

type AuthLayoutProps = {
  heroText: string;
  children: ReactNode;
};

export default function AuthLayout({ heroText, children }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroGlow}>
            <Image
              src="/assets/Bruto.svg"
              alt="Mascote CT Legado"
              width={400}
              height={400}
              priority
              className={styles.mascot}
            />
          </div>
          <p className={styles.heroText}>{heroText}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
