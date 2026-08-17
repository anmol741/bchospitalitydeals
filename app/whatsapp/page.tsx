import NavbarWA from "@/components/whatsapp/NavbarWA";
import FooterWA from "@/components/whatsapp/FooterWA";
import HeroSectionWA from "@/components/whatsapp/HeroSectionWA";
import StatsSection from "@/components/home/StatsSection";
import ListingsSectionWA from "@/components/whatsapp/ListingsSectionWA";
import WhyBcSection from "@/components/home/WhyBcSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import ImmigrationSection from "@/components/home/ImmigrationSection";
import ConsultationCtaSection from "@/components/home/ConsultationCtaSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";

export default function WhatsAppHomePage() {
  return (
    <>
      <NavbarWA />
      <main className="flex-1">
        <HeroSectionWA />
        <StatsSection />
        <ListingsSectionWA />
        <WhyBcSection />
        <WhyUsSection />
        <ImmigrationSection />
        <ConsultationCtaSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <FooterWA />
    </>
  );
}
