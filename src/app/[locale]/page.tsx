import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Gallery } from "@/components/Gallery/Gallery";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { About } from "@/components/About/About";
import { OrderForm } from "@/components/OrderForm/OrderForm";
import { Footer } from "@/components/Footer/Footer";

export default async function Home() {
  const t = await getTranslations("header");

  return (
    <>
      <a href="#main-content" className="skipToContent">
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Gallery />
        <HowItWorks />
        <About />
        <OrderForm />
      </main>
      <Footer />
    </>
  );
}
