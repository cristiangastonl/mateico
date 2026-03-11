"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./Hero.module.css";

export function Hero() {
  const t = useTranslations("hero");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "sending") return;

    setStatus("sending");
    try {
      await fetch("https://formspree.io/f/xpwzgkjq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _subject: "Mateico Waitlist" }),
      });
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section id="waitlist" className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.subtitle}>{t("subtitle")}</p>
        {status === "sent" ? (
          <p className={styles.success}>{t("success")}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={styles.input}
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
