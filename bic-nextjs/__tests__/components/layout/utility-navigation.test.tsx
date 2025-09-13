import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { UtilityNavigation } from "@/components/layout/header/utility-navigation";
import { vi } from "vitest";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

const messages = {
  utility: {
    auth: {
      login: "Login",
    },
    language: {
      select: "Select language",
      english: "English",
      korean: "Korean",
      chinese: "Chinese",
    },
    theme: {
      toggle: "Toggle theme",
      light: "Light mode",
      dark: "Dark mode",
    },
    search: {
      placeholder: "Search...",
      button: "Search",
    },
  },
  common: {
    skip_to_content: "Skip to main content",
  },
};

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <NextIntlClientProvider messages={messages} locale="en">
      {children}
    </NextIntlClientProvider>
  </ThemeProvider>
);

describe("UtilityNavigation", () => {
  it("renders login button", () => {
    render(<UtilityNavigation />, { wrapper: AllProviders });

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders skip to content link", () => {
    render(<UtilityNavigation />, { wrapper: AllProviders });

    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
  });

  it("has proper accessibility structure", () => {
    render(<UtilityNavigation />, { wrapper: AllProviders });

    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });
});
