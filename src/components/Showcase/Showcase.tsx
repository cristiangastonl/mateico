"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import styles from "./Showcase.module.css";

const slides = [
  { key: "river", src: "/mates/river-plate.jpg" },
  { key: "familia", src: "/mates/familia-mama.jpg" },
  { key: "amor", src: "/mates/amor-daniel.jpg" },
  { key: "tipos", src: "/mates/tipos-mates.jpg" },
  { key: "laser", src: "/mates/laser-close.jpg" },
  { key: "riverBombilla", src: "/mates/river-bombilla.jpg" },
];

export function Showcase() {
  const t = useTranslations("showcase");
  const [current, setCurrent] = useState(0);

  function go(dir: -1 | 1) {
    setCurrent((prev) => (prev + dir + slides.length) % slides.length);
  }

  return (
    <section className={styles.section} aria-labelledby="showcase-title">
      <h2 id="showcase-title" className="sectionTitle">{t("title")}</h2>
      <div className={styles.carousel}>
        <button
          onClick={() => go(-1)}
          className={styles.arrow}
          aria-label={t("prev")}
        >
          ‹
        </button>
        <div className={styles.slideContainer}>
          {slides.map((slide, i) => (
            <div
              key={slide.key}
              className={`${styles.slide} ${i === current ? styles.active : ""}`}
            >
              <Image
                src={slide.src}
                alt={t(`items.${slide.key}`)}
                fill
                sizes="(max-width: 768px) 90vw, 700px"
                className={styles.image}
                priority={i === 0}
              />
            </div>
          ))}
          <p className={styles.caption} aria-live="polite">
            {t(`items.${slides[current].key}`)}
          </p>
        </div>
        <button
          onClick={() => go(1)}
          className={styles.arrow}
          aria-label={t("next")}
        >
          ›
        </button>
      </div>
      <div className={styles.dots}>
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            onClick={() => setCurrent(i)}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            aria-label={`${i + 1} / ${slides.length}`}
          />
        ))}
      </div>
    </section>
  );
}
