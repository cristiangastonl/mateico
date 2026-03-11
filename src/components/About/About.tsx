import { useTranslations } from "next-intl";
import styles from "./About.module.css";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={styles.content}>
        <div className={styles.imagePlaceholder} aria-hidden="true">
          <svg viewBox="0 0 200 200" className={styles.svg}>
            <circle cx="100" cy="100" r="90" fill="#2a3d2a" opacity="0.1" />
            <ellipse cx="100" cy="110" rx="40" ry="55" fill="#2a3d2a" opacity="0.15" stroke="#2a3d2a" strokeWidth="2" />
            <ellipse cx="100" cy="60" rx="40" ry="14" fill="none" stroke="#2a3d2a" strokeWidth="2" />
            <path d="M140 110 Q160 110 155 90 Q150 70 140 70" fill="none" stroke="#2a3d2a" strokeWidth="2" />
          </svg>
        </div>
        <div className={styles.text}>
          <h2 id="about-title" className={styles.title}>{t("title")}</h2>
          <p>{t("text1")}</p>
          <p>{t("text2")}</p>
          <p className={styles.highlight}>{t("text3")}</p>
        </div>
      </div>
    </section>
  );
}
