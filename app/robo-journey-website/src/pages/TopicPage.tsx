import { Link, useParams } from "react-router";
import { getTopic, neighborTopics } from "../content/load";
import { MarkdownView } from "../components/MarkdownView";
import { DocMeasure, headingsFromMarkdown } from "../components/DocChrome";
import { topicFromDir } from "../content/links";

export function TopicPage() {
  const { "*": slug } = useParams();
  const topic = slug ? getTopic(slug) : undefined;
  if (!topic) {
    return <p className="text-app-faint">Topic not found.</p>;
  }
  const { prev, next } = neighborTopics(topic.slug);
  const headings = headingsFromMarkdown(topic.markdown);
  return (
    <DocMeasure headings={headings}>
      <MarkdownView markdown={topic.markdown} fromDir={topicFromDir(topic.slug)} />
      <nav className="mt-12 flex justify-between border-t border-app-border pt-6 text-sm">
        {prev ? (
          <Link className="text-app-accent hover:underline" to={`/topic/${prev.slug}`}>
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="text-app-accent hover:underline" to={`/topic/${next.slug}`}>
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </DocMeasure>
  );
}
