import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Showcase } from "@/components/Showcase/Showcase";
import { Categories } from "@/components/Categories/Categories";
import { Craft } from "@/components/Craft/Craft";
import { WaitlistCta } from "@/components/WaitlistCta/WaitlistCta";
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
        <Showcase />
        <Categories />
        <Craft />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
