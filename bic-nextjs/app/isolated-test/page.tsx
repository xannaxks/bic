"use client";

import "../clean-shadow.css";
import { ThemeToggle } from "@/components/features/theme/theme-toggle";

export default function IsolatedTestPage() {
  return (
    <div className="min-h-screen p-8">
      <style jsx>{`
        /* Inline CSS to completely isolate from other styles */
        .inline-shadow-test {
          padding: 24px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: box-shadow 2000ms ease-in-out;
          cursor: pointer;
        }

        .inline-shadow-test:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .dark .inline-shadow-test {
          background: #1f2937;
          border-color: #374151;
          box-shadow: 0 1px 3px rgba(255, 255, 255, 0.1);
        }

        .dark .inline-shadow-test:hover {
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.3);
        }

        /* Test with transform */
        .inline-transform-test {
          padding: 24px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          transform: translateY(0px);
          transition: transform 2000ms cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .inline-transform-test:hover {
          transform: translateY(-10px);
        }

        .dark .inline-transform-test {
          background: #1f2937;
          border-color: #374151;
        }
      `}</style>

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Isolated Animation Test</h1>
          <ThemeToggle />
        </div>

        <div className="space-y-8">
          {/* Inline CSS test */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">1. Inline CSS (No Tailwind, No Global CSS)</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="inline-shadow-test">
                <h3 className="mb-2 font-semibold">Pure Shadow (2s)</h3>
                <p className="text-sm opacity-70">
                  Hover me - using style jsx, completely isolated
                </p>
              </div>

              <div className="inline-transform-test">
                <h3 className="mb-2 font-semibold">Pure Transform (2s)</h3>
                <p className="text-sm opacity-70">
                  Hover me - transform only, no shadow
                </p>
              </div>
            </div>
          </section>

          {/* Clean CSS file test */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">2. Clean CSS File (clean-shadow.css)</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="clean-shadow rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Clean Shadow</h3>
                <p className="text-sm text-muted-foreground">
                  From clean-shadow.css file
                </p>
              </div>

              <div className="clean-shadow-transform rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Shadow + Transform</h3>
                <p className="text-sm text-muted-foreground">
                  Combined effect from clean CSS
                </p>
              </div>
            </div>
          </section>

          {/* Raw HTML/CSS test */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">3. Raw HTML Style Attribute</h2>
            <div
              style={{
                padding: "24px",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3 className="mb-2 font-semibold">Inline Style Attribute</h3>
              <p className="text-sm text-muted-foreground">
                Using React onMouseEnter/Leave with style attribute
              </p>
            </div>
          </section>

          {/* Debug info */}
          <section className="rounded-lg border bg-muted p-4">
            <h2 className="mb-2 text-lg font-semibold">Troubleshooting Steps:</h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Check if ANY of the above work smoothly</li>
              <li>If inline CSS works but others don't = Global CSS conflict</li>
              <li>If none work = Browser/System issue</li>
              <li>Check DevTools → Elements → Computed → transition-duration</li>
              <li>Make sure it shows "2s" not "0.01ms"</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}