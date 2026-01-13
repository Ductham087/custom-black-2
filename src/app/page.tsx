import { Metadata } from "next";
import Banner from "./components/home/hero";
import Companies from "./components/home/companies";
import Work from "./components/home/work";
import Table from "./components/home/table";
import Features from "./components/home/features";
import Simple from "./components/home/simple";
import Trade from "./components/home/trade";
import Faq from "./components/home/faq";
import ContactForm from "./components/ContactForm";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import Aoscompo from "@/lib/utils/aos";
import ScrollToTop from "./components/scroll-to-top";

export const metadata: Metadata = {
  title: "Crypto",
};

export default function Home() {
  return (
    <main>
      <Aoscompo>
        <Header />
        <Banner />
        <Companies />
        <Work />
        <Table />
        <Features />
        <Simple />
        <Trade />
        <Faq />
        <ContactForm />
        <Footer />
      </Aoscompo>
      <ScrollToTop />
    </main>
  );
}
