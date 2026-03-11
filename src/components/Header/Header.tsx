"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Header.module.css";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const newLocale = locale === "es" ? "en" : "es";
    const path = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(path);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href={`/${locale}`} className={styles.logo}>
          {t("logo")}
        </a>
        <button
          onClick={switchLocale}
          className={styles.langToggle}
          aria-label={t("switchLang")}
        >
          {locale === "es" ? "EN" : "ES"}
        </button>
      </div>
    </header>
  );
}
