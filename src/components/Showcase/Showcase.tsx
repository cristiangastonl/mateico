"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Showcase.module.css";

const images = [
  { src: "/mates/campeon-bandera.webp", alt: "campeonBandera" },
  { src: "/mates/campeon-rosamonte.webp", alt: "campeonRosamonte" },
  { src: "/mates/mate-clasico.webp", alt: "mateClasico" },
];

export function Showcase() {
  const t = useTranslations("showcase");
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className={styles.section} aria-labelledby="showcase-title">
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={t(`images.${img.alt}`)}
          fill
          sizes="100vw"
          priority={i === 0}
          className={`${styles.bgImage} ${i === current ? styles.bgActive : ""}`}
        />
      ))}
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <h2 id="showcase-title" className={styles.title}>{t("title")}</h2>
        <p className={styles.text}>{t("text1")}</p>
        <p className={styles.text}>{t("text2")}</p>
        <p className={styles.highlight}>{t("highlight")}</p>
      </div>
      <div className={styles.dots}>
        {images.map((img, i) => (
          <span
            key={img.src}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
