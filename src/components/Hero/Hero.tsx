"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export function Hero() {
  const t = useTranslations("hero");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/cristiangastonl@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _subject: "Mateico Waitlist – Hero" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section id="waitlist" className={styles.hero} aria-labelledby="hero-title">
      <Image
        src="/mates/river-plate.webp"
        alt="Mate artesanal con grabado láser personalizado"
        fill
        priority
        className={styles.bgImage}
        sizes="100vw"
      />
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <h1 id="hero-title" className={styles.title}>{t("title")}</h1>
        <p className={styles.subtitle}>{t("subtitle")}</p>
        {status === "sent" ? (
          <p className={styles.success} role="status" aria-live="polite">{t("success")}</p>
        ) : status === "error" ? (
          <p className={styles.error} role="alert">{t("error")}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} aria-label={t("formLabel")}>
            <label htmlFor="waitlist-email" className="srOnly">{t("emailPlaceholder")}</label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={styles.input}
              autoComplete="email"
            />
            <button type="submit" disabled={status === "sending"} className={styles.button}>
              {status === "sending" ? t("sending") : t("cta")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
