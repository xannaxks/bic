"use client";

import { useEffect, useState } from "react";

export default function DebugStylesPage() {
  const [computedStyles, setComputedStyles] = useState<any>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Get computed styles after a small delay to ensure everything is loaded
    setTimeout(() => {
      const testElement = document.getElementById("test-element");
      if (testElement) {
        const styles = window.getComputedStyle(testElement);
        setComputedStyles({
          transitionDuration: styles.transitionDuration,
          transitionProperty: styles.transitionProperty,
          transitionTimingFunction: styles.transitionTimingFunction,
          transitionDelay: styles.transitionDelay,
          animationDuration: styles.animationDuration,
          boxShadow: styles.boxShadow,
          willChange: styles.willChange,
        });
      }
    }, 100);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold">Debug: Finding the 1e-05s Issue</h1>

        {/* Test element with explicit inline styles */}
        <div
          id="test-element"
          style={{
            padding: "24px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "box-shadow 2s ease-in-out", // Explicitly set 2s
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          <h2 className="font-bold mb-2">Test Element (inline style: 2s transition)</h2>
          <p>Hover me - I should animate slowly over 2 seconds</p>
        </div>

        {/* Display computed styles */}
        <div className="rounded-lg border bg-muted p-6">
          <h2 className="mb-4 text-xl font-semibold">Computed Styles for Test Element:</h2>
          <pre className="text-sm overflow-x-auto">
{JSON.stringify(computedStyles, null, 2)}
          </pre>

          {computedStyles.transitionDuration && (
            <div className="mt-4 p-4 rounded bg-yellow-100 dark:bg-yellow-900">
              <p className="font-semibold">
                ⚠️ Actual transition-duration: {computedStyles.transitionDuration}
              </p>
              {computedStyles.transitionDuration === "1e-05s" && (
                <p className="text-sm mt-2">
                  This is being overridden to nearly instant! Should be "2s"
                </p>
              )}
              {computedStyles.transitionDuration === "0.00001s" && (
                <p className="text-sm mt-2">
                  This is being overridden to nearly instant! Should be "2s"
                </p>
              )}
            </div>
          )}
        </div>

        {/* Check all stylesheets */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Active Stylesheets:</h2>
          <button
            onClick={() => {
              const sheets = Array.from(document.styleSheets);
              console.log("All stylesheets:", sheets);

              sheets.forEach((sheet, index) => {
                try {
                  const rules = Array.from(sheet.cssRules || []);
                  rules.forEach((rule: any) => {
                    if (rule.cssText && rule.cssText.includes("transition-duration")) {
                      console.log(`Sheet ${index}:`, rule.cssText);
                    }
                  });
                } catch (e) {
                  console.log(`Can't access sheet ${index}:`, e);
                }
              });

              alert("Check browser console for stylesheet analysis");
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Analyze All CSS Rules (Check Console)
          </button>
        </div>

        {/* Pure HTML test without any React/Next.js */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Pure HTML/CSS (No Framework):</h2>
          <iframe
            srcDoc={`
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  .pure-test {
                    padding: 24px;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: box-shadow 2s ease-in-out;
                    cursor: pointer;
                  }
                  .pure-test:hover {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                  }
                </style>
              </head>
              <body style="font-family: sans-serif; padding: 20px;">
                <div class="pure-test">
                  <h3>Pure HTML/CSS in iframe</h3>
                  <p>Hover me - If this works, it's a Next.js/React issue</p>
                </div>
                <p style="margin-top: 20px; font-size: 12px;">
                  Computed transition-duration: <span id="duration"></span>
                </p>
                <script>
                  const el = document.querySelector('.pure-test');
                  const computed = window.getComputedStyle(el);
                  document.getElementById('duration').textContent = computed.transitionDuration;
                </script>
              </body>
              </html>
            `}
            className="w-full h-48 bg-white rounded"
          />
        </div>
      </div>
    </div>
  );
}