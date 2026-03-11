import { useTranslations } from "next-intl";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>Mateico</span>
          <p className={styles.tagline}>{t("tagline")}</p>
        </div>
        <nav className={styles.links} aria-label={t("footerNav")}>
          <div className={styles.column}>
            <h4>{t("contact")}</h4>
            <a href="mailto:hello@mateico.com">hello@mateico.com</a>
          </div>
          <div className={styles.column}>
            <h4>{t("followUs")}</h4>
            <a href="https://instagram.com/mateico" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </nav>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Mateico. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
