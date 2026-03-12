import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Jost } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = "https://mateico.nl";

  return {
    title: t("title"),
    description: t("description"),
    verification: {
      google: "5lddci1BGFQC9Y_9bBRHO_0XMsA0-HBWG1cJoVzC8lw",
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "Mateico",
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Mateico — Mates personalizados",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/og-image.png`],
    },
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Mateico",
              description:
                locale === "es"
                  ? "Mates personalizados con grabado láser en Amsterdam. El regalo argentino perfecto, con envíos a toda Europa."
                  : "Custom laser-engraved mates handcrafted in Amsterdam. The perfect Argentine gift, shipping across Europe.",
              url: "https://mateico.nl",
              email: "hello@mateico.com",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "",
                addressLocality: "Amsterdam",
                addressRegion: "Noord-Holland",
                postalCode: "",
                addressCountry: "NL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 52.3676,
                longitude: 4.9041,
              },
              image: "https://mateico.nl/og-image.png",
              areaServed: {
                "@type": "Place",
                name: "Europe",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mateico",
              url: "https://mateico.nl",
              logo: "https://mateico.nl/og-image.png",
              email: "hello@mateico.com",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name:
                locale === "es"
                  ? "Mate personalizado con grabado láser"
                  : "Custom laser-engraved mate",
              description:
                locale === "es"
                  ? "Mate artesanal grabado con láser de alta precisión. Disponible en calabaza, madera y metal. Personalizado con tu diseño."
                  : "Handcrafted mate engraved with high-precision laser. Available in gourd, wood and metal. Personalized with your design.",
              brand: {
                "@type": "Brand",
                name: "Mateico",
              },
              image: "https://mateico.nl/og-image.png",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "EUR",
                lowPrice: "35",
                highPrice: "85",
                availability: "https://schema.org/PreOrder",
              },
              material:
                locale === "es"
                  ? "Calabaza, madera, metal"
                  : "Gourd, wood, metal",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity:
                locale === "es"
                  ? [
                      {
                        "@type": "Question",
                        name: "\u00bfC\u00f3mo funciona?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Eleg\u00eds lo que quer\u00e9s grabar (tu club, tu banda, un nombre, una frase), nos mand\u00e1s la idea por email y nosotros dise\u00f1amos el grabado. Cuando lo aprob\u00e1s, lo grabamos con l\u00e1ser y te lo mandamos.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "\u00bfQu\u00e9 se puede grabar?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Todo lo que se te ocurra. Escudos de f\u00fatbol, personajes de anime, frases, nombres, fechas, logos de bandas, dise\u00f1os propios... si se puede dibujar, se puede grabar.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "\u00bfHacen env\u00edos?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "S\u00ed, hacemos env\u00edos a toda Europa. Estamos en Amsterdam pero mandamos a donde est\u00e9s.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "\u00bfCu\u00e1nto tarda?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Depende de la complejidad del dise\u00f1o, pero en general entre 1 y 2 semanas desde que aprob\u00e1s el dise\u00f1o.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "\u00bfQu\u00e9 materiales usan?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Trabajamos con calabaza, madera y metal. Cada material tiene su encanto y el l\u00e1ser queda distinto en cada uno.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "\u00bfPuedo pedir uno de regalo?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "\u00a1Claro! Es uno de los pedidos que m\u00e1s nos hacen. Podemos grabarlo con el nombre de la persona, una fecha especial o lo que quieras.",
                        },
                      },
                    ]
                  : [
                      {
                        "@type": "Question",
                        name: "How does it work?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "You pick what you want engraved (your club, your band, a name, a phrase), send us the idea by email and we design the engraving. Once you approve it, we laser-engrave it and ship it to you.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "What can you engrave?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Anything you can think of. Football crests, anime characters, quotes, names, dates, band logos, your own designs... if it can be drawn, it can be engraved.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "Do you ship internationally?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Yes, we ship all across Europe. We're based in Amsterdam but we deliver wherever you are.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "How long does it take?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "It depends on the complexity of the design, but generally between 1 and 2 weeks from the moment you approve the design.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "What materials do you use?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "We work with gourd, wood and metal. Each material has its own charm and the laser finish looks different on each one.",
                        },
                      },
                      {
                        "@type": "Question",
                        name: "Can I order one as a gift?",
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: "Absolutely! It's one of the most popular requests we get. We can engrave it with the person's name, a special date, or whatever you'd like.",
                        },
                      },
                    ],
            }),
          }}
        />
      </head>
      <body className={`${fraunces.variable} ${jost.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
