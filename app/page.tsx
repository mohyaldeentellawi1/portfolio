import About from "@/components/about";
import Projects from "@/components/projects";
import Reviews from "@/components/reviews";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="pt-25 pb-14 px-6 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-card border rounded-sm shadow-2xl shadow-slate-400 dark:shadow-slate-800 divide-y divide-border">
          <About />
          <Projects />
          <Reviews />
          <Contact />
        </div>
      </div>
    </main>
  );
}
