import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "@/app/[locale]/page";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

// Mock components
vi.mock("@/components/sections/HeroSection", () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section</div>,
}));

vi.mock("@/components/sections/TrustSignals/TrustSignals", () => ({
  TrustSignals: () => <div data-testid="trust-signals">Trust Signals</div>,
}));

vi.mock("@/components/sections/QuickActions/QuickActionsGrid", () => ({
  QuickActionsGrid: () => <div data-testid="quick-actions">Quick Actions</div>,
}));

vi.mock("@/components/sections/NewsMediaSection", () => ({
  NewsMediaSection: () => <div data-testid="news-media">News & Media</div>,
}));

vi.mock("@/components/seo/JsonLdSchema", () => ({
  UniversitySchema: () => null,
}));

// Mock messages for i18n
const messages = {
  navigation: {
    home: "Home",
    about: "About",
  },
  hero: {
    title: "Welcome",
    subtitle: "University",
  },
  quickActions: {
    undergraduate: "Undergraduate",
    graduate: "Graduate",
  },
};

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <NextIntlClientProvider messages={messages} locale="en">
      {children}
    </NextIntlClientProvider>
  </ThemeProvider>
);

describe("HomePage", () => {
  it("should render all main homepage sections", () => {
    render(<HomePage />, { wrapper: AllProviders });

    // Check all major sections are present
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("trust-signals")).toBeInTheDocument();
    expect(screen.getByTestId("quick-actions")).toBeInTheDocument();
    expect(screen.getByTestId("news-media")).toBeInTheDocument();
  });

  it("should render hero section", () => {
    render(<HomePage />, { wrapper: AllProviders });

    const heroSection = screen.getByTestId("hero-section");
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveTextContent("Hero Section");
  });

  it("should render trust signals section", () => {
    render(<HomePage />, { wrapper: AllProviders });

    const trustSection = screen.getByTestId("trust-signals");
    expect(trustSection).toBeInTheDocument();
    expect(trustSection).toHaveTextContent("Trust Signals");
  });

  it("should render quick actions section", () => {
    render(<HomePage />, { wrapper: AllProviders });

    const quickActionsSection = screen.getByTestId("quick-actions");
    expect(quickActionsSection).toBeInTheDocument();
    expect(quickActionsSection).toHaveTextContent("Quick Actions");
  });

  it("should render news and media section", () => {
    render(<HomePage />, { wrapper: AllProviders });

    const newsSection = screen.getByTestId("news-media");
    expect(newsSection).toBeInTheDocument();
    expect(newsSection).toHaveTextContent("News & Media");
  });

  it("should have proper semantic structure", () => {
    const { container } = render(<HomePage />, { wrapper: AllProviders });

    // Check for main landmark
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();

    // Check for sections
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("should render sections in correct order", () => {
    const { container } = render(<HomePage />, { wrapper: AllProviders });

    const sections = container.querySelectorAll("[data-testid]");
    const sectionOrder = Array.from(sections).map((s) =>
      s.getAttribute("data-testid")
    );

    // Verify the order of major sections
    const expectedOrder = [
      "hero-section",
      "quick-actions",
      "trust-signals",
      "news-media",
    ];
    const actualOrder = sectionOrder.filter((id) =>
      expectedOrder.includes(id || "")
    );

    expect(actualOrder).toEqual(expectedOrder);
  });
});
