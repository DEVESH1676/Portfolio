import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function ErrorBoundary({ children }: Props) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error }) => (
        <div className="p-8 max-w-4xl mx-auto mt-20 bg-destructive/10 border border-destructive rounded-lg text-destructive-foreground">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <details className="whitespace-pre-wrap font-mono text-sm bg-black/5 p-4 rounded overflow-auto">
            <summary className="mb-2 font-semibold cursor-pointer">
              Error Details
            </summary>
            {error ? String(error) : null}
          </details>
        </div>
      )}
      onError={(error, info) => {
        console.error("Uncaught error:", error, info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
