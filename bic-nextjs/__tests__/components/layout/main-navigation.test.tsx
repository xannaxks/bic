import { render, screen, act } from "@testing-library/react";
import { MainNavigation } from "@/components/layout/header/main-navigation";
import { vi } from "vitest";

// Mock the navigation components
vi.mock("@/components/layout/header/navigation-logo", () => ({
  NavigationLogo: () => <div data-testid="navigation-logo">Logo</div>,
}));

vi.mock("@/components/layout/header/navigation-menu", () => ({
  NavigationMenu: () => <div data-testid="navigation-menu">Menu</div>,
}));

vi.mock("@/components/layout/header/mobile-menu-button", () => ({
  MobileMenuButton: ({
    isOpen,
    onToggle,
  }: {
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <button data-testid="mobile-menu-button" onClick={onToggle}>
      {isOpen ? "Close" : "Menu"}
    </button>
  ),
}));

// Mock useScrollPosition hook
const mockScrollPosition = {
  scrollY: 0,
  isVisible: false,
  isScrollingUp: false,
  isScrolled: false,
  shouldShowNavigation: true,
};

vi.mock("@/hooks/useScrollPosition", () => ({
  useScrollPosition: () => mockScrollPosition,
}));

describe("MainNavigation", () => {
  beforeEach(() => {
    // Reset mock values
    mockScrollPosition.scrollY = 0;
    mockScrollPosition.isScrolled = false;
    mockScrollPosition.shouldShowNavigation = true;
  });

  it("should render navigation components", () => {
    render(<MainNavigation />);

    expect(screen.getByTestId("navigation-logo")).toBeInTheDocument();
    expect(screen.getByTestId("navigation-menu")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-menu-button")).toBeInTheDocument();
  });

  it("should show/hide based on scroll position", () => {
    // Initially visible
    mockScrollPosition.shouldShowNavigation = true;
    const { container, rerender } = render(<MainNavigation />);
    let nav = container.querySelector("nav");
    expect(nav).toHaveClass("translate-y-0", "opacity-100");

    // Simulate scroll to hide
    mockScrollPosition.shouldShowNavigation = false;
    rerender(<MainNavigation />);
    nav = container.querySelector("nav");
    expect(nav).toHaveClass("-translate-y-full", "opacity-0");
  });

  it("should apply glass morphism effect when scrolled", () => {
    const { container } = render(<MainNavigation />);
    const nav = container.querySelector("nav");

    // Initially transparent
    expect(nav).toHaveClass("bg-transparent");

    // Simulate scroll
    mockScrollPosition.isScrolled = true;
    const { container: scrolledContainer } = render(<MainNavigation />);
    const scrolledNav = scrolledContainer.querySelector("nav");

    expect(scrolledNav).toHaveClass("bg-background/95", "backdrop-blur");
  });

  it("should handle mobile menu toggle", () => {
    const { getByTestId } = render(<MainNavigation />);
    const mobileButton = getByTestId("mobile-menu-button");

    // Initially closed
    expect(mobileButton).toHaveTextContent("Menu");
    expect(
      screen.queryByText("Mobile menu will be implemented in Epic 3")
    ).not.toBeInTheDocument();

    // Click to open
    act(() => {
      mobileButton.click();
    });

    expect(mobileButton).toHaveTextContent("Close");
    expect(
      screen.getByText("Mobile menu will be implemented in Epic 3")
    ).toBeInTheDocument();
  });

  it("should have proper ARIA labels", () => {
    const { container } = render(<MainNavigation />);
    const nav = container.querySelector("nav");

    expect(nav).toHaveAttribute("aria-label", "Main navigation");
  });
});
