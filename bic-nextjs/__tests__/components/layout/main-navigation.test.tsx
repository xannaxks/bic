import { render, screen, act } from "@testing-library/react";
import { MainNavigation } from "@/components/layout/header/main-navigation";
import { vi } from "vitest";

// Mock the navigation components
vi.mock("@/components/layout/header/navigation-logo", () => ({
  NavigationLogo: () => <div data-testid="navigation-logo">Logo</div>,
}));

vi.mock("@/components/layout/header/navigation-menu", () => ({
  NavigationMenuDemo: () => <div data-testid="navigation-menu">Menu</div>,
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

    expect(screen.getByTestId("navigation-menu")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-menu-button")).toBeInTheDocument();
  });

  it("should show/hide based on scroll position", () => {
    // Initially visible
    mockScrollPosition.shouldShowNavigation = true;
    const { container, rerender } = render(<MainNavigation />);
    let navContainer = container.querySelector("div.fixed");
    expect(navContainer).toHaveClass("translate-y-0", "opacity-100");

    // Simulate scroll to hide
    mockScrollPosition.shouldShowNavigation = false;
    rerender(<MainNavigation />);
    navContainer = container.querySelector("div.fixed");
    expect(navContainer).toHaveClass("-translate-y-full", "opacity-0");
  });

  it("should apply glass morphism effect", () => {
    const { container } = render(<MainNavigation />);
    const navContainer = container.querySelector("div.fixed");

    // Should have glass morphism classes
    expect(navContainer).toHaveClass("bg-background/95", "backdrop-blur");
  });

  it("should handle mobile menu toggle", () => {
    const { getByTestId, container } = render(<MainNavigation />);
    const mobileButton = getByTestId("mobile-menu-button");
    const mobileMenu = container.querySelector("#mobile-navigation");

    // Initially closed (menu has opacity-0 and pointer-events-none)
    expect(mobileButton).toHaveTextContent("Menu");
    expect(mobileMenu).toHaveClass("-translate-y-full", "opacity-0", "pointer-events-none");

    // Click to open
    act(() => {
      mobileButton.click();
    });

    // After opening, button text changes and mobile menu becomes visible
    expect(mobileButton).toHaveTextContent("Close");
    expect(mobileMenu).toHaveClass("translate-y-0", "opacity-100");
    expect(
      screen.getByText("Mobile menu will be implemented in Epic 3")
    ).toBeInTheDocument();
  });

  it("should have mobile menu placeholder", () => {
    render(<MainNavigation />);
    const mobileMenuPlaceholder = screen.getByText(
      "Mobile menu will be implemented in Epic 3"
    );
    expect(mobileMenuPlaceholder).toBeInTheDocument();
  });
});
