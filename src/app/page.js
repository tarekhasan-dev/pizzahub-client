
import HeroSection from "@/components/home/HeroSection";
import MenuSection from "@/components/menu/MenuSection";
import AboutSection from "@/components/about/AboutSection";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
