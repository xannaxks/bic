"use client";

import { useEffect, useState } from "react";

export default function MotionTestPage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [testAnimation, setTestAnimation] = useState(false);

  useEffect(() => {
    // Check if reduced motion is enabled
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold">Motion Settings Debugger</h1>

        {/* Status Check */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">System Motion Settings</h2>
          <div className="space-y-2">
            <p className="text-lg">
              Prefers Reduced Motion: {" "}
              <span className={`font-bold ${prefersReducedMotion ? "text-red-500" : "text-green-500"}`}>
                {prefersReducedMotion ? "ENABLED (Animations disabled)" : "DISABLED (Animations working)"}
              </span>
            </p>
            {prefersReducedMotion && (
              <div className="mt-4 rounded bg-red-50 dark:bg-red-950 p-4 text-red-800 dark:text-red-200">
                <p className="font-semibold">⚠️ Reduced Motion is ON</p>
                <p className="text-sm mt-2">
                  Your system has "Reduce Motion" enabled. This makes ALL animations instant (0.01ms).
                </p>
                <p className="text-sm mt-2">
                  To see smooth animations, disable it in your OS settings:
                </p>
                <ul className="text-sm mt-2 list-disc pl-5">
                  <li>Windows: Settings → Accessibility → Visual effects → Animation effects → ON</li>
                  <li>macOS: System Preferences → Accessibility → Display → Reduce motion → OFF</li>
                </ul>
              </div>
            )}
            {!prefersReducedMotion && (
              <div className="mt-4 rounded bg-green-50 dark:bg-green-950 p-4 text-green-800 dark:text-green-200">
                <p className="font-semibold">✅ Animations are enabled</p>
                <p className="text-sm mt-2">
                  Your animations should be working smoothly!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Test Animations */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Animation Test</h2>

          <div className="space-y-4">
            {/* CSS Transition Test */}
            <div
              className="rounded bg-primary p-4 text-primary-foreground cursor-pointer"
              style={{
                transform: testAnimation ? "translateX(100px)" : "translateX(0)",
                transition: "transform 2s ease-in-out"
              }}
              onClick={() => setTestAnimation(!testAnimation)}
            >
              Click me - I should move slowly (2s)
            </div>

            {/* Our Shadow Animation */}
            <div className="shadow-animate-base shadow-animate-slow rounded-lg border bg-card p-6">
              <p>Hover me - Shadow should appear slowly (2s)</p>
            </div>

            {/* Raw CSS Test */}
            <style jsx>{`
              .raw-test {
                background: var(--primary);
                color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .raw-test:hover {
                transform: scale(1.1);
              }
            `}</style>
            <div className="raw-test">
              Hover me - Raw CSS scale animation (2s)
            </div>
          </div>
        </div>

        {/* CSS Debug Info */}
        <div className="rounded-lg border bg-muted p-6">
          <h2 className="mb-4 text-xl font-semibold">CSS Debug Info</h2>
          <pre className="text-xs overflow-x-auto">
{`/* Current CSS being applied */
@media (prefers-reduced-motion: reduce) {
  /* This should ONLY apply if setting is ON */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

Status: ${prefersReducedMotion ? "ACTIVE - Making animations instant!" : "INACTIVE - Animations normal"}
`}
          </pre>
        </div>
      </div>
    </div>
  );
}