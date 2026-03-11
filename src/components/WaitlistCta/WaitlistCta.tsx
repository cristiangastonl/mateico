"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./WaitlistCta.module.css";

export function WaitlistCta() {
  const t = useTranslations("waitlistCta");
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
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{t("title")}</h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>
        {status === "sent" ? (
          <p className={styles.success} role="status" aria-live="polite">{t("success")}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="cta-email" className="srOnly">{t("emailPlaceholder")}</label>
            <input
              id="cta-email"
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
