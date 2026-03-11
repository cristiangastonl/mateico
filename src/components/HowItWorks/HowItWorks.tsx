import { useTranslations } from "next-intl";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    key: "step1",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <rect x="12" y="8" width="40" height="48" rx="4" />
        <path d="M22 24h20M22 32h20M22 40h12" />
        <circle cx="32" cy="16" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "step2",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <circle cx="32" cy="32" r="22" />
        <path d="M32 10v22l14 8" />
        <path d="M20 44l-6 10M44 44l6 10" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "step3",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <rect x="8" y="20" width="48" height="32" rx="4" />
        <path d="M8 28h48" />
        <path d="M24 8h16l8 12H16l8-12z" />
        <circle cx="22" cy="52" r="4" fill="currentColor" />
        <circle cx="42" cy="52" r="4" fill="currentColor" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className={styles.section} aria-labelledby="how-it-works-title">
      <div className="section">
        <h2 id="how-it-works-title" className="sectionTitle">{t("title")}</h2>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.key} className={styles.card}>
              <div className={styles.number} aria-hidden="true">{i + 1}</div>
              <div className={styles.icon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{t(`${step.key}.title`)}</h3>
              <p className={styles.stepDesc}>{t(`${step.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
