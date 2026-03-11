import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Craft.module.css";

export function Craft() {
  const t = useTranslations("craft");

  return (
    <section className={styles.section} aria-labelledby="craft-title">
      <div className={styles.inner}>
        <div className={styles.images}>
          <div className={styles.imageWrap}>
            <Image
              src="/mates/laser-close.jpg"
              alt={t("text1")}
              fill
              sizes="(max-width: 768px) 90vw, 500px"
              className={styles.image}
            />
          </div>
          <div className={styles.imageWrap}>
            <Image
              src="/mates/laser-machine.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 500px"
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.text}>
          <h2 id="craft-title" className={styles.title}>{t("title")}</h2>
          <p>{t("text1")}</p>
          <p>{t("text2")}</p>
          <p className={styles.highlight}>{t("text3")}</p>
        </div>
      </div>
    </section>
  );
}
