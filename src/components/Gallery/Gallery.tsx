import { useTranslations } from "next-intl";
import styles from "./Gallery.module.css";

const designs = [
  { key: "fileteado", color: "#c94040" },
  { key: "pampa", color: "#d4a847" },
  { key: "tango", color: "#8b5e3c" },
  { key: "botanico", color: "#4a7c4a" },
  { key: "amsterdam", color: "#4a6fa5" },
  { key: "custom", color: "#7c6b8a" },
] as const;

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="section">
      <h2 className="sectionTitle">{t("title")}</h2>
      <p className="sectionSubtitle">{t("subtitle")}</p>
      <div className={styles.grid}>
        {designs.map((d) => (
          <div key={d.key} className={styles.card}>
            <div className={styles.placeholder} style={{ backgroundColor: d.color + "15" }}>
              <svg viewBox="0 0 120 140" className={styles.svg}>
                <ellipse cx="60" cy="85" rx="35" ry="45" fill={d.color + "25"} stroke={d.color} strokeWidth="2" />
                <ellipse cx="60" cy="45" rx="35" ry="12" fill={d.color + "15"} stroke={d.color} strokeWidth="2" />
                <path d="M95 85 Q110 85 108 70 Q106 55 95 55" fill="none" stroke={d.color} strokeWidth="2" />
              </svg>
            </div>
            <p className={styles.label}>{t(`items.${d.key}`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
