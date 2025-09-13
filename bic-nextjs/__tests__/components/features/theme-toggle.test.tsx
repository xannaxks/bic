import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/features/theme/theme-toggle";
import { ThemeProvider } from "next-themes";
import { vi } from "vitest";

// Mock next-themes
vi.mock("next-themes", async () => {
  const actual = await vi.importActual("next-themes");
  return {
    ...actual,
    useTheme: vi.fn(() => ({
      theme: "light",
      setTheme: vi.fn(),
      resolvedTheme: "light",
      themes: ["light", "dark", "system"],
    })),
  };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="light">
    {children}
  </ThemeProvider>
);

describe("ThemeToggle", () => {
  it("should render theme toggle button", () => {
    render(<ThemeToggle />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label");
  });

  it("should toggle between light and dark modes", async () => {
    const { useTheme } = await import("next-themes");
    const mockSetTheme = vi.fn();

    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
      resolvedTheme: "light",
      themes: ["light", "dark", "system"],
    });

    const { rerender } = render(<ThemeToggle />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");

    // Click to switch to dark mode
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");

    // Update mock to reflect dark mode
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
      resolvedTheme: "dark",
      themes: ["light", "dark", "system"],
    });

    rerender(<ThemeToggle />);

    // Click to switch back to light mode
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("should show correct icon based on theme", async () => {
    const { useTheme } = await import("next-themes");

    // Light mode
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: vi.fn(),
      resolvedTheme: "light",
      themes: ["light", "dark", "system"],
    });

    const { container, rerender } = render(<ThemeToggle />, {
      wrapper: TestWrapper,
    });

    // Check for sun/moon icon classes
    let icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();

    // Dark mode
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      setTheme: vi.fn(),
      resolvedTheme: "dark",
      themes: ["light", "dark", "system"],
    });

    rerender(<ThemeToggle />);
    icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    render(<ThemeToggle />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
    expect(button.getAttribute("aria-label")).toContain("theme");
  });

  it("should handle keyboard navigation", () => {
    const { useTheme } = vi.mocked(await import("next-themes"));
    const mockSetTheme = vi.fn();

    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
      resolvedTheme: "light",
      themes: ["light", "dark", "system"],
    });

    render(<ThemeToggle />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");

    // Press Enter key
    fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
    expect(mockSetTheme).toHaveBeenCalled();

    // Press Space key
    fireEvent.keyDown(button, { key: " ", code: "Space" });
    expect(mockSetTheme).toHaveBeenCalled();
  });
});
