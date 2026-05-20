import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden flex items-center py-24 px-6 sm:px-8 lg:px-10"
    >
      {/* Background gradient orbs — give the blur container something to blur against */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* ── Blur container ── */}
        <div className="backdrop-blur-xl bg-background/50 border border-border/40 rounded-3xl p-8 md:p-10 lg:p-14 shadow-sm">
          {/* ── Top row: image + bio ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            {/* Developer image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-full lg:max-w-sm rounded-full overflow-hidden border border-border/40 shadow-md">
                <Image
                  src="/myImage.svg"
                  alt="Muheddin Tellawi — developer portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Bio text */}
            <div className="flex flex-col gap-6">
              {/* Label + heading */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  About Me
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  Crafting digital experiences that matter
                </h2>
              </div>

              {/* Bio paragraphs */}
              <div className="flex flex-col gap-4">
                <p className="text-base text-muted-foreground leading-relaxed">
                  I&apos;m a full-stack developer passionate about building
                  clean, performant, and accessible web applications. I
                  specialise in React and Next.js ecosystems, with a focus on
                  delivering pixel-perfect UIs backed by solid architecture.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  With a strong eye for design and a deep understanding of
                  modern tooling, I bridge the gap between engineering and
                  aesthetics — turning ideas into products people love to use.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/40">
                {[
                  { value: "3+", label: "Years Exp." },
                  { value: "20+", label: "Projects" },
                  { value: "100%", label: "Dedication" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-0.5 pt-4">
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                      {value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="my-10 border-t border-border/40" />

          {/* ── Video placeholder ── */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                Introduction Video
              </span>
              <p className="text-sm text-muted-foreground">
                A short walkthrough of who I am and what I build.
              </p>
            </div>

            {/* Video frame */}
            <div className="group relative w-full aspect-video overflow-hidden rounded-2xl border border-border/40 bg-muted/50 cursor-pointer">
              {/* Subtle grid texture */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Centered play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-105">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full
                             bg-primary/10 border border-primary/20
                             transition-colors duration-200 group-hover:bg-primary/20"
                >
                  {/* Play icon — offset by 2px to account for optical centering */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    aria-hidden="true"
                    className="ml-1 text-primary"
                  >
                    <path d="M7 4.5l12 6.5-12 6.5V4.5z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Watch Introduction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
