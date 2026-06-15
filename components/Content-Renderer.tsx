import ReactMarkdown from "react-markdown";

export function ContentRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="mt-8 mb-4 text-2xl font-bold text-foreground">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mt-6 mb-3 text-xl font-semibold text-foreground">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="mb-5 leading-8 text-muted-foreground">{children}</p>
        ),

        ul: ({ children }) => (
          <ul className="mb-5 list-disc space-y-2 pr-6 text-muted-foreground">
            {children}
          </ul>
        ),

        blockquote: ({ children }) => (
          <blockquote className="my-6 border-s-4 border-primary ps-4 italic">
            {children}
          </blockquote>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),

        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {children}
          </a>
        ),

        code: ({ children }) => (
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            {children}
          </code>
        ),

        hr: () => <hr className="my-8 border-border" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
