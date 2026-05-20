import Nav from "@/components/nav";
import About from "@/components/about";
import Projects from "@/components/projects";
import Reviews from "@/components/reviews";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <About />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
