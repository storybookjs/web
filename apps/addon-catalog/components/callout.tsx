import * as React from "react";

// TODO: Styles
export function Callout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border p-4">
      {children}
    </div>
  );
}