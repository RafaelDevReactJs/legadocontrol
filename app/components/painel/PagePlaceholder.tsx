import styles from "./PagePlaceholder.module.css";

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export default function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className={styles.page}>
      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        <span className={styles.badgeText}>Painel administrativo</span>
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>

      <div className={styles.card}>
        <p className={styles.cardText}>
          Conteúdo em desenvolvimento. Esta funcionalidade estará disponível em
          breve.
        </p>
      </div>
    </section>
  );
}
