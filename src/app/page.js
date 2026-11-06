import BrowseCategories from "@/components/home/BrowseCategories";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroSlider from "@/components/home/HeroSlider";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowBookingWorks from "@/components/home/HowBookingWorks";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedStudios />
      <BrowseCategories />
      <HowBookingWorks />
      <HostGuarantee />
    </>
  );
}
