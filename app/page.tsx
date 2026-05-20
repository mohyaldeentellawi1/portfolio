import Nav from "@/components/nav";
import About from "@/components/about";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <About />
      <Projects />
    </div>
  );
}
