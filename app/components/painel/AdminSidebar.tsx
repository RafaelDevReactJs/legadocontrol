"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_LOGIN_ROUTE, ADMIN_NAV_ITEMS } from "@/app/config/adminNav";
import { clearSessionCookie } from "@/lib/auth/syncSessionCookie";
import { useLogoutMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { clearSession } from "@/store/slices/authSlice";
import styles from "./AdminSidebar.module.css";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/painel") {
    return pathname === "/painel";
  }
  return pathname.startsWith(href);
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch {
      // Limpa sessão local mesmo se a API de logout falhar
    } finally {
      dispatch(clearSession());
      await clearSessionCookie();
      router.push(ADMIN_LOGIN_ROUTE);
    }
  }

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
        <button type="button" onClick={handleLogout} className={styles.logoutLink}>
          Sair
        </button>
      </div>
    </aside>
  );
}
