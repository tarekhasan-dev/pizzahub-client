
import HeroSection from "@/components/home/HeroSection";
import MenuSection from "@/components/menu/MenuSection";

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <HeroSection />
      <MenuSection />

      {/* Next: Featured Items, Categories, Why Choose PizzaHub */}
    </div>
  );
}
