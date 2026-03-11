import { useTranslations } from "next-intl";
import styles from "./Categories.module.css";

const categories = [
  { key: "futbol", emoji: "⚽" },
  { key: "familia", emoji: "👨‍👩‍👧‍👦" },
  { key: "amor", emoji: "❤️" },
  { key: "anime", emoji: "🎌" },
  { key: "argentina", emoji: "🇦🇷" },
  { key: "bandas", emoji: "🎸" },
  { key: "poesia", emoji: "✍️" },
  { key: "custom", emoji: "✨" },
];

export function Categories() {
  const t = useTranslations("categories");

  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <div className={styles.inner}>
        <h2 id="categories-title" className="sectionTitle">{t("title")}</h2>
        <p className="sectionSubtitle">{t("subtitle")}</p>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <div key={cat.key} className={styles.card}>
              <span className={styles.emoji} aria-hidden="true">{cat.emoji}</span>
              <h3 className={styles.name}>{t(cat.key)}</h3>
              <p className={styles.desc}>{t(`${cat.key}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
