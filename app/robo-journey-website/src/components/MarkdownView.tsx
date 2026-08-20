import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Link } from "react-router";
import { MermaidBlock } from "./MermaidBlock";
import { CodeBlock } from "./CodeBlock";
import { resolveContentHref } from "../content/links";

type Props = {
  markdown: string;
  fromDir: string;
};

export function MarkdownView({ markdown, fromDir }: Props) {
  const components: Components = {
    a({ href, children }) {
      const next = resolveContentHref(href, fromDir);
      if (next?.startsWith("/")) {
        return (
          <Link to={next} className="text-app-accent underline-offset-2 hover:underline">
            {children}
          </Link>
        );
      }
      return (
        <a href={next} className="text-app-accent underline-offset-2 hover:underline" target={next?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {children}
        </a>
      );
    },
    code({ className, children, ...props }) {
      const text = String(children);
      const lang = /language-(\w+)/.exec(className ?? "")?.[1];
      const isBlock = Boolean(lang) || text.includes("\n");
      if (lang === "mermaid") {
        return <MermaidBlock chart={text} />;
      }
      if (isBlock) {
        return <CodeBlock code={text} language={lang ?? "plaintext"} />;
      }
      return (
        <code className="rounded bg-app-code px-1 py-0.5 text-[0.9em]" {...props}>
          {children}
        </code>
      );
    },
    pre({ children }) {
      return <div className="my-4">{children}</div>;
    },
    table({ children }) {
      return (
        <div className="my-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">{children}</table>
        </div>
      );
    },
    th({ children }) {
      return <th className="border border-app-border bg-app-code px-2 py-1 text-left">{children}</th>;
    },
    td({ children }) {
      return <td className="border border-app-border px-2 py-1 align-top">{children}</td>;
    },
  };

  return (
    <div className="prose-classroom">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
