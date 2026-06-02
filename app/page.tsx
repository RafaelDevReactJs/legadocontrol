import Image from "next/image";
import AuthForm from "./components/AuthForm";
import styles from "./page.module.css";

export default function Home() {
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
          <p className={styles.heroText}>
            Tradição nordestina e Jiu-Jitsu de elite. Entre na sua conta e
            continue escrevendo sua história no tatame.
          </p>
        </div>

        <AuthForm />
      </div>
    </div>
  );
}
