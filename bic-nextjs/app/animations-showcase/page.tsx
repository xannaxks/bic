"use client";

import { ThemeToggle } from "@/components/features/theme/theme-toggle";

export default function AnimationsShowcasePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Complete Animations Showcase</h1>
          <ThemeToggle />
        </div>

        <div className="space-y-12">
          {/* Scale Animations */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Scale Animations</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 font-semibold">Available Classes:</h3>
                <ul className="space-y-2 text-sm">
                  <li><code className="rounded bg-muted px-2 py-1">.scale-up-hover</code> - Scale to 1.1x on hover</li>
                  <li><code className="rounded bg-muted px-2 py-1">.scale-up-hover-subtle</code> - Scale to 1.05x on hover</li>
                  <li><code className="rounded bg-muted px-2 py-1">.scale-up-center</code> - Animate on load from 0.5x to 1x</li>
                </ul>
              </div>

              <div className="scale-up-hover rounded-lg border bg-card p-6 text-center">
                <div className="mb-2 text-4xl">🚀</div>
                <h3 className="font-semibold">Scale 1.1x</h3>
                <p className="text-sm text-muted-foreground">Hover me</p>
              </div>

              <div className="scale-up-hover-subtle rounded-lg border bg-card p-6 text-center">
                <div className="mb-2 text-4xl">✨</div>
                <h3 className="font-semibold">Scale 1.05x</h3>
                <p className="text-sm text-muted-foreground">Subtle effect</p>
              </div>
            </div>
          </section>

          {/* Shadow Animations */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Shadow Animations</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 font-semibold">Available Classes:</h3>
                <ul className="space-y-2 text-sm">
                  <li><code className="rounded bg-muted px-2 py-1">.clean-shadow</code> - Smooth shadow on hover</li>
                  <li><code className="rounded bg-muted px-2 py-1">.clean-shadow-transform</code> - Shadow + lift</li>
                  <li><code className="rounded bg-muted px-2 py-1">.shadow-pulse</code> - Pulsing shadow</li>
                </ul>
              </div>

              <div className="clean-shadow rounded-lg border bg-card p-6 text-center">
                <div className="mb-2 text-4xl">🎨</div>
                <h3 className="font-semibold">Clean Shadow</h3>
                <p className="text-sm text-muted-foreground">Smooth transition</p>
              </div>

              <div className="clean-shadow-transform rounded-lg border bg-card p-6 text-center">
                <div className="mb-2 text-4xl">🎯</div>
                <h3 className="font-semibold">Shadow + Lift</h3>
                <p className="text-sm text-muted-foreground">Combined effect</p>
              </div>
            </div>
          </section>

          {/* Combined Effects */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Combined Effects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="scale-up-hover-subtle clean-shadow rounded-lg border bg-card p-6 text-center">
                <div className="mb-2 text-4xl">💎</div>
                <h3 className="font-semibold">Scale + Shadow</h3>
                <p className="text-sm text-muted-foreground">Best of both</p>
              </div>

              <div className="scale-up-hover clean-shadow-transform rounded-lg border bg-card p-6 text-center">
                <div className="mb-2 text-4xl">🌟</div>
                <h3 className="font-semibold">Scale + Shadow + Lift</h3>
                <p className="text-sm text-muted-foreground">Premium feel</p>
              </div>

              <div className="shadow-pulse rounded-lg border bg-card p-6 text-center">
                <div className="mb-2 text-4xl">💫</div>
                <h3 className="font-semibold">Pulsing Shadow</h3>
                <p className="text-sm text-muted-foreground">Attention grabber</p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Button Examples</h2>
            <div className="flex flex-wrap gap-4">
              <button className="scale-up-hover rounded-md bg-primary px-6 py-2 text-primary-foreground">
                Scale Button
              </button>
              <button className="clean-shadow rounded-md bg-secondary px-6 py-2 text-secondary-foreground">
                Shadow Button
              </button>
              <button className="scale-up-hover-subtle clean-shadow rounded-md bg-accent px-6 py-2 text-accent-foreground">
                Combined Button
              </button>
              <button className="shadow-pulse rounded-md border bg-background px-6 py-2">
                Pulsing Button
              </button>
            </div>
          </section>

          {/* Cards */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Card Examples</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="scale-up-hover-subtle clean-shadow rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Product Card</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Perfect for e-commerce products with subtle hover effect
                </p>
                <button className="rounded bg-primary px-4 py-1 text-sm text-primary-foreground">
                  View Details
                </button>
              </div>

              <div className="clean-shadow-transform rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Blog Card</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Great for blog posts with shadow and lift effect
                </p>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>Jan 13, 2025</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>

              <div className="scale-up-hover rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Feature Card</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Eye-catching scale effect for important features
                </p>
                <div className="text-2xl">🚀</div>
              </div>
            </div>
          </section>

          {/* Usage Guide */}
          <section className="rounded-lg border bg-muted p-6">
            <h2 className="mb-4 text-xl font-bold">Quick Usage Guide</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold">For subtle interactions:</h3>
                <code className="block rounded bg-background p-2">
                  className="scale-up-hover-subtle clean-shadow"
                </code>
              </div>
              <div>
                <h3 className="font-semibold">For prominent CTAs:</h3>
                <code className="block rounded bg-background p-2">
                  className="scale-up-hover clean-shadow-transform"
                </code>
              </div>
              <div>
                <h3 className="font-semibold">For attention grabbing:</h3>
                <code className="block rounded bg-background p-2">
                  className="shadow-pulse"
                </code>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}