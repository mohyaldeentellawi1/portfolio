import React from "react";

function parseInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

function Block({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim());
  if (!lines.length) return null;

  if (lines[0].startsWith("### "))
    return (
      <h3 className="text-xl font-bold tracking-tight text-foreground mt-2">
        {lines[0].slice(4)}
      </h3>
    );
  if (lines[0].startsWith("## "))
    return (
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-2">
        {lines[0].slice(3)}
      </h2>
    );
  if (lines[0].startsWith("# "))
    return (
      <h1 className="text-3xl font-bold tracking-tight text-foreground mt-2">
        {lines[0].slice(2)}
      </h1>
    );

  if (lines.every((l) => l.startsWith("> ")))
    return (
      <blockquote className="border-l-4 border-primary pl-5 italic text-muted-foreground">
        {lines.map((l, i) => (
          <p key={i}>{parseInline(l.slice(2))}</p>
        ))}
      </blockquote>
    );

  if (lines.every((l) => /^[*-] /.test(l)))
    return (
      <ul className="list-disc list-inside flex flex-col gap-1.5 text-muted-foreground">
        {lines.map((l, i) => (
          <li key={i} className="text-base">
            {parseInline(l.slice(2))}
          </li>
        ))}
      </ul>
    );

  return (
    <p className="text-base text-muted-foreground leading-relaxed">
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {parseInline(line)}
        </React.Fragment>
      ))}
    </p>
  );
}

export function ContentRenderer({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/);
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => (
        <Block key={i} text={block} />
      ))}
    </div>
  );
}
