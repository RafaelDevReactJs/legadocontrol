"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_LOGIN_ROUTE, ADMIN_NAV_ITEMS } from "../../config/adminNav";
import styles from "./AdminSidebar.module.css";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/painel") {
    return pathname === "/painel";
  }
  return pathname.startsWith(href);
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoWrap}>
        <Image
          src="/assets/Legado.svg"
          alt="CT Legado"
          width={160}
          height={53}
          className={styles.logo}
          priority
        />
      </div>

      <nav className={styles.nav} aria-label="Menu do painel">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = isActiveRoute(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <Link href={ADMIN_LOGIN_ROUTE} className={styles.logoutLink}>
          Sair
        </Link>
      </div>
    </aside>
  );
}
