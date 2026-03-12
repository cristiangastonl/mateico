"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Ideas.module.css";

const ideas = [
  { key: "campeonBandera", src: "/mates/campeon-bandera.webp", category: "argentina" },
  { key: "bocaJuniors", src: "/mates/boca-juniors.webp", category: "futbol" },
  { key: "laRenga", src: "/mates/la-renga.webp", category: "bandas" },
  { key: "amorFrase", src: "/mates/amor-frase.webp", category: "amor" },
  { key: "campeonRosamonte", src: "/mates/campeon-rosamonte.webp", category: "argentina" },
  { key: "dragonBall", src: "/mates/dragon-ball.webp", category: "anime" },
  { key: "riverAgustin", src: "/mates/river-agustin.webp", category: "futbol" },
  { key: "musicaFrase", src: "/mates/musica-frase.webp", category: "bandas" },
  { key: "personalizadoFacu", src: "/mates/personalizado-facu.webp", category: "custom" },
  { key: "mateClasico", src: "/mates/mate-clasico.webp", category: "argentina" },
  { key: "campeonesMundo", src: "/mates/campeones-mundo.webp", category: "futbol" },
];

const categoryColors: Record<string, string> = {
  futbol: "#4a9e5c",
  argentina: "#75aadb",
  bandas: "#c44a4a",
  amor: "#d4608a",
  anime: "#9b59b6",
  custom: "#d4a847",
};

export function Ideas() {
  const t = useTranslations("ideas");
  const ct = useTranslations("categories");
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track || isDragging) return;

    let animId: number;
    let speed = 0.5;

    function step() {
      if (!track) return;
      track.scrollLeft += speed;
      // Loop back when reaching near the end
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
        track.scrollLeft = 0;
      }
      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  function handlePointerDown(e: React.PointerEvent) {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  }

  function handlePointerUp() {
    setIsDragging(false);
  }

  return (
    <section className={styles.section} aria-labelledby="ideas-title">
      <div className={styles.header}>
        <h2 id="ideas-title" className="sectionTitle">{t("title")}</h2>
        <p className="sectionSubtitle">{t("subtitle")}</p>
      </div>
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {ideas.map((idea) => (
          <div key={idea.key} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={idea.src}
                alt={t(`items.${idea.key}`)}
                fill
                sizes="280px"
                loading="lazy"
                className={styles.image}
              />
              <span
                className={styles.badge}
                style={{ background: categoryColors[idea.category] ?? "#d4a847" }}
              >
                {ct(idea.category)}
              </span>
            </div>
            <p className={styles.caption}>{t(`items.${idea.key}`)}</p>
          </div>
        ))}
      </div>
      <p className={styles.hint}>{t("hint")}</p>
    </section>
  );
}
