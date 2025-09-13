"use client";

import { ThemeToggle } from "@/components/features/theme/theme-toggle";

export default function TestAnimationsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Shadow Animation Test - Fixed</h1>
          <ThemeToggle />
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-xl font-semibold">Scale Up Animations (New)</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Scale up on hover - transition */}
              <div className="scale-up-hover rounded-lg border bg-card p-6 text-center">
                <h3 className="mb-2 font-semibold">Scale 1.1x</h3>
                <p className="text-sm text-muted-foreground">
                  Hover for scale up
                </p>
              </div>

              {/* Scale up subtle */}
              <div className="scale-up-hover-subtle rounded-lg border bg-card p-6 text-center">
                <h3 className="mb-2 font-semibold">Scale 1.05x</h3>
                <p className="text-sm text-muted-foreground">
                  Subtle scale on hover
                </p>
              </div>

              {/* Scale up animation on load */}
              <div className="scale-up-center rounded-lg border bg-card p-6 text-center">
                <h3 className="mb-2 font-semibold">On Load</h3>
                <p className="text-sm text-muted-foreground">
                  Animated on page load
                </p>
              </div>

              {/* Combined scale + shadow */}
              <div className="scale-up-hover-subtle clean-shadow rounded-lg border bg-card p-6 text-center">
                <h3 className="mb-2 font-semibold">Combined</h3>
                <p className="text-sm text-muted-foreground">
                  Scale + Shadow
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Shadow Animations</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Slow animation - 2s */}
              <div className="shadow-animate-base shadow-animate-slow rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Slow (2s)</h3>
                <p className="text-sm text-muted-foreground">
                  Hover for smooth shadow transition
                </p>
              </div>

              {/* Medium animation - 1s */}
              <div className="shadow-animate-base shadow-animate-medium rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Medium (1s)</h3>
                <p className="text-sm text-muted-foreground">
                  Hover for medium speed shadow
                </p>
              </div>

              {/* Pulsing animation */}
              <div className="shadow-animate-base shadow-pulse rounded-lg border bg-card p-6">
                <h3 className="mb-2 font-semibold">Pulsing</h3>
                <p className="text-sm text-muted-foreground">
                  Continuous pulse animation
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">OLD: Original Implementation (for comparison)</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 hover-shadow-drop">
                <h3 className="mb-2 font-semibold">Old Slow</h3>
                <p className="text-sm text-muted-foreground">
                  Original implementation
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 hover-shadow-drop-fast">
                <h3 className="mb-2 font-semibold">Old Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Original fast variant
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 shadow-drop-center">
                <h3 className="mb-2 font-semibold">Old Pulse</h3>
                <p className="text-sm text-muted-foreground">
                  Original pulse animation
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Button Examples with New Classes</h2>
            <div className="flex flex-wrap gap-4">
              <button className="shadow-animate-base shadow-animate-slow rounded-md bg-primary px-4 py-2 text-primary-foreground">
                Primary (Slow)
              </button>
              <button className="shadow-animate-base shadow-animate-medium rounded-md border bg-background px-4 py-2">
                Secondary (Medium)
              </button>
              <button className="shadow-animate-base shadow-pulse rounded-full bg-accent px-6 py-2 text-accent-foreground">
                Pulsing Button
              </button>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Card Examples with Fixed Animations</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="shadow-animate-base shadow-animate-slow rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Smooth Card (2s)</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  This card has proper GPU-accelerated smooth shadow animation
                </p>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>Smooth</span>
                  <span>•</span>
                  <span>No flicker</span>
                </div>
              </div>

              <div className="shadow-animate-base shadow-animate-medium rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Medium Speed Card (1s)</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Medium speed transition with transform
                </p>
                <button className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Learn More
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Debug Info</h2>
            <div className="rounded-lg border bg-muted p-4">
              <p className="mb-2 text-sm font-semibold">Fixed Issues:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>✅ Added GPU acceleration with translateZ(0)</li>
                <li>✅ Added backface-visibility: hidden to prevent flicker</li>
                <li>✅ Using proper cubic-bezier easing</li>
                <li>✅ Combined shadow with subtle transform</li>
                <li>✅ Proper initial state defined</li>
                <li>✅ Theme-aware shadows working correctly</li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                Toggle theme to verify smooth transitions in both modes
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}