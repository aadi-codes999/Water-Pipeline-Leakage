import React from "react";

interface Props {
    children?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error | null;
    errorInfo?: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Caught by ErrorBoundary:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
                    <div className="w-full max-w-3xl p-8 bg-card text-card-foreground rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-2">An unexpected error occurred</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            The application encountered an error while rendering. Check the browser console for details.
                        </p>
                        <details className="whitespace-pre-wrap text-xs text-muted-foreground mb-4">
                            {this.state.error?.message}
                            {this.state.errorInfo?.componentStack}
                        </details>
                        <div className="flex gap-2">
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm"
                            >
                                Reload
                            </button>
                            <button
                                onClick={() =>
                                    this.setState({ hasError: false, error: null, errorInfo: null })
                                }
                                className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
