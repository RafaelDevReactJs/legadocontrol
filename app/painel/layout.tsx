import AdminSidebar from "../components/painel/AdminSidebar";
import styles from "./layout.module.css";

export const metadata = {
  title: "CT Legado — Painel",
  description: "Painel de controle administrativo do CT Legado",
};

export default function PainelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.shell}>
      <div className={styles.sidebarWrap}>
        <AdminSidebar />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
