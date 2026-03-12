"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./Faq.module.css";

const questions = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function Faq() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<string | null>(null);

  function toggle(key: string) {
    setOpen((prev) => (prev === key ? null : key));
  }

  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className={styles.inner}>
        <h2 id="faq-title" className={styles.title}>
          {t("title")}
        </h2>
        <dl className={styles.list}>
          {questions.map((q) => {
            const isOpen = open === q;
            return (
              <div key={q} className={styles.item}>
                <dt>
                  <button
                    className={styles.question}
                    onClick={() => toggle(q)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${q}`}
                  >
                    <span>{t(q)}</span>
                    <span className={styles.indicator} aria-hidden="true">
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-${q}`}
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}
                  role="region"
                >
                  <p>{t(q.replace("q", "a") as `a${string}`)}</p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
