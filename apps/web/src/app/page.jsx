import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Works from "../components/Works";
import Activity from "../components/Activity";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]">
      <Header />
      <Hero />
      <About />
      <Works />
      <Activity />
      <Contact />
      <Footer />
    </div>
  );
}