import { MarkdownView } from "../components/MarkdownView";
import { jargonsMarkdown } from "../content/load";
import { DocMeasure, headingsFromMarkdown } from "../components/DocChrome";

export function JargonsPage() {
  return (
    <DocMeasure headings={headingsFromMarkdown(jargonsMarkdown)}>
      <MarkdownView markdown={jargonsMarkdown} fromDir="docs" />
    </DocMeasure>
  );
}
