import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/features/language/language-switcher";
import { NextIntlClientProvider } from "next-intl";
import { vi } from "vitest";

// Mock next/navigation
const mockPush = vi.fn();
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-intl
vi.mock("next-intl", async () => {
  const actual = await vi.importActual("next-intl");
  return {
    ...actual,
    useLocale: () => "en",
    useTranslations: () => (key: string) => {
      const translations: Record<string, string> = {
        select: "Select language",
        english: "English",
        korean: "Korean",
        chinese: "Chinese",
      };
      return translations[key] || key;
    },
  };
});

const messages = {
  utility: {
    language: {
      select: "Select language",
      english: "English",
      korean: "Korean",
      chinese: "Chinese",
    },
  },
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider messages={messages} locale="en">
    {children}
  </NextIntlClientProvider>
);

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear cookies
    document.cookie = "locale=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

  it("should render language switcher button", () => {
    render(<LanguageSwitcher />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("English");
  });

  it("should show dropdown menu on click", () => {
    render(<LanguageSwitcher />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");

    // Initially dropdown should not be visible
    expect(screen.queryByText("Korean")).not.toBeInTheDocument();

    // Click to open dropdown
    fireEvent.click(button);

    // Dropdown should be visible
    waitFor(() => {
      expect(screen.getByText("Korean")).toBeInTheDocument();
      expect(screen.getByText("Chinese")).toBeInTheDocument();
    });
  });

  it("should switch language and set cookie", async () => {
    render(<LanguageSwitcher />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Wait for dropdown to appear
    await waitFor(() => {
      const koreanOption = screen.getByText("Korean");
      expect(koreanOption).toBeInTheDocument();

      // Click Korean option
      fireEvent.click(koreanOption);
    });

    // Check if cookie was set
    expect(document.cookie).toContain("locale=ko");

    // Check if router.push was called
    expect(mockPush).toHaveBeenCalled();
  });

  it("should display current locale correctly", async () => {
    const { useLocale } = vi.mocked(await import("next-intl"));

    // Mock Korean locale
    (useLocale as jest.Mock).mockReturnValue("ko");

    render(<LanguageSwitcher />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");
    // Should show Korean when locale is 'ko'
    expect(button).toHaveTextContent("Korean");
  });

  it("should have proper ARIA attributes", () => {
    render(<LanguageSwitcher />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
    expect(button).toHaveAttribute("aria-expanded");

    // Initially closed
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Open dropdown
    fireEvent.click(button);

    waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("should close dropdown when clicking outside", async () => {
    const { container } = render(<LanguageSwitcher />, {
      wrapper: TestWrapper,
    });

    const button = screen.getByRole("button");

    // Open dropdown
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Korean")).toBeInTheDocument();
    });

    // Click outside
    fireEvent.click(container);

    await waitFor(() => {
      expect(screen.queryByText("Korean")).not.toBeInTheDocument();
    });
  });

  it("should handle keyboard navigation", async () => {
    render(<LanguageSwitcher />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");

    // Press Enter to open
    fireEvent.keyDown(button, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Korean")).toBeInTheDocument();
    });

    // Press Escape to close
    fireEvent.keyDown(button, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      expect(screen.queryByText("Korean")).not.toBeInTheDocument();
    });
  });

  it("should persist language preference", async () => {
    // Set cookie
    document.cookie = "locale=zh; path=/;";

    const { useLocale } = vi.mocked(await import("next-intl"));
    (useLocale as jest.Mock).mockReturnValue("zh");

    render(<LanguageSwitcher />, { wrapper: TestWrapper });

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Chinese");
  });
});
