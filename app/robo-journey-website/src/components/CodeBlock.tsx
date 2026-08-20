import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../theme";

export function CodeBlock({ code, language }: { code: string; language: string }) {
  const { theme } = useTheme();
  return (
    <SyntaxHighlighter
      language={language === "ls" ? "plaintext" : language}
      style={theme === "dark" ? oneDark : oneLight}
      customStyle={{ margin: 0, borderRadius: "0.5rem", fontSize: "0.85rem" }}
    >
      {code.replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
}
