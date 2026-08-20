import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { TopicPage } from "./pages/TopicPage";
import { DrillPage } from "./pages/DrillPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { JargonsPage } from "./pages/JargonsPage";
import { ThemeProvider } from "./theme";

const MindMapPage = lazy(() => import("./pages/MindMapPage").then((m) => ({ default: m.MindMapPage })));
const PlanPage = lazy(() => import("./pages/PlanPage").then((m) => ({ default: m.PlanPage })));

const basename = import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <Suspense fallback={<div className="bg-app-bg p-8 text-app-muted">Loading…</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="topic/*" element={<TopicPage />} />
              <Route path="drill/:slug" element={<DrillPage />} />
              <Route path="glossary" element={<GlossaryPage />} />
              <Route path="jargons" element={<JargonsPage />} />
              <Route path="mindmap" element={<MindMapPage />} />
              <Route path="plan" element={<PlanPage />} />
              <Route path="sim" element={<Navigate to="/plan" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
