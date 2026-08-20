import { MarkdownView } from "../components/MarkdownView";
import { glossaryMarkdown } from "../content/load";
import { DocMeasure, headingsFromMarkdown } from "../components/DocChrome";

export function GlossaryPage() {
  return (
    <DocMeasure headings={headingsFromMarkdown(glossaryMarkdown)}>
      <MarkdownView markdown={glossaryMarkdown} fromDir="docs" />
    </DocMeasure>
  );
}
