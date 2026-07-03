import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ListingsSection from "@/components/home/ListingsSection";
import WhyBcSection from "@/components/home/WhyBcSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import ImmigrationSection from "@/components/home/ImmigrationSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import ConsultationCtaSection from "@/components/home/ConsultationCtaSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ListingsSection />
        <WhyBcSection />
        <WhyUsSection />
        <ImmigrationSection />
        <ContactFormSection />
        <ConsultationCtaSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
