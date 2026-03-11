import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Gallery } from "@/components/Gallery/Gallery";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { About } from "@/components/About/About";
import { OrderForm } from "@/components/OrderForm/OrderForm";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
