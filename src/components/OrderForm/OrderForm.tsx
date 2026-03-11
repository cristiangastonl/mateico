"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./OrderForm.module.css";

export function OrderForm() {
  const t = useTranslations("orderForm");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await fetch("https://formspree.io/f/xpwzgkjq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _subject: "Mateico Order Request" }),
      });
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <section id="order" className={styles.section}>
        <div className="section">
          <p className={styles.success}>{t("success")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className={styles.section}>
      <div className="section">
        <h2 className="sectionTitle">{t("title")}</h2>
        <p className="sectionSubtitle">{t("subtitle")}</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name">{t("name")}</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">{t("email")}</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="mateType">{t("mateType")}</label>
            <select id="mateType" name="mateType" required>
              <option value="calabaza">{t("mateTypes.calabaza")}</option>
              <option value="madera">{t("mateTypes.madera")}</option>
              <option value="ceramica">{t("mateTypes.ceramica")}</option>
              <option value="vidrio">{t("mateTypes.vidrio")}</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="design">{t("design")}</label>
            <textarea
              id="design"
              name="design"
              rows={4}
              placeholder={t("designPlaceholder")}
              required
            />
          </div>
          <button type="submit" disabled={status === "sending"} className={styles.button}>
            {status === "sending" ? t("sending") : t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
