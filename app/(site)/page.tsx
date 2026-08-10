import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoMarquee />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Blog />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}
