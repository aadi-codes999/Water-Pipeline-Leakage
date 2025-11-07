import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

// Global error listeners to capture runtime exceptions outside React
window.addEventListener("error", (e) => {
    // eslint-disable-next-line no-console
    console.error("Global error captured:", e.error || e.message || e);
});
window.addEventListener("unhandledrejection", (e) => {
    // eslint-disable-next-line no-console
    console.error("Unhandled promise rejection:", e.reason || e);
});

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);

