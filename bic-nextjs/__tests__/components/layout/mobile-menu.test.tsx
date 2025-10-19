import { render, screen, fireEvent, within } from "@testing-library/react";
import { MobileMenu } from "@/components/layout/header/mobile-menu";
import { NAVIGATION_SECTIONS } from "@/lib/constants/navigation";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("MobileMenu", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(
      <MobileMenu isOpen={false} onClose={mockOnClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render when isOpen is true", () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole("button", { name: /About TU/i })).toBeInTheDocument();
  });

  it("should render all navigation sections", () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    NAVIGATION_SECTIONS.forEach((section) => {
      expect(
        screen.getByRole("button", { name: new RegExp(section.title, "i") })
      ).toBeInTheDocument();
    });
  });

  it("should expand accordion section on click", async () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    const aboutButton = screen.getByRole("button", { name: /About TU/i });
    fireEvent.click(aboutButton);

    // Check if first item from About TU section is visible
    const firstItem = NAVIGATION_SECTIONS[0].items[0];
    expect(
      await screen.findByRole("link", { name: firstItem.title })
    ).toBeInTheDocument();
  });

  it("should display all items when section is expanded", async () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    const admissionButton = screen.getByRole("button", { name: /Admission/i });
    fireEvent.click(admissionButton);

    const admissionSection = NAVIGATION_SECTIONS[1];
    for (const item of admissionSection.items) {
      expect(
        await screen.findByRole("link", { name: item.title })
      ).toBeInTheDocument();
    }
  });

  it("should call onClose when a menu item is clicked", async () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    const aboutButton = screen.getByRole("button", { name: /About TU/i });
    fireEvent.click(aboutButton);

    const firstItem = NAVIGATION_SECTIONS[0].items[0];
    const link = await screen.findByRole("link", { name: firstItem.title });
    fireEvent.click(link);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should have correct href for navigation links", async () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    const academicsButton = screen.getByRole("button", { name: /Academics/i });
    fireEvent.click(academicsButton);

    const academicsSection = NAVIGATION_SECTIONS[2];
    const firstItem = academicsSection.items[0];
    const link = await screen.findByRole("link", { name: firstItem.title });

    expect(link).toHaveAttribute("href", firstItem.href);
  });

  it("should display icons for each section", () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    NAVIGATION_SECTIONS.forEach((section) => {
      const button = screen.getByRole("button", {
        name: new RegExp(section.title, "i"),
      });
      const svg = within(button).getByRole("img", { hidden: true });
      expect(svg).toHaveClass("h-5", "w-5", "text-primary");
    });
  });

  it("should have minimum touch target height of 44px", () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    const aboutButton = screen.getByRole("button", { name: /About TU/i });
    expect(aboutButton).toHaveClass("min-h-[44px]");
  });

  it("should render correct number of sections", () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    const sections = screen.getAllByRole("button", {
      name: /About TU|Admission|Academics|Special Joint Program|International Student Support/i,
    });
    expect(sections).toHaveLength(5);
  });

  it("should support accordion single mode (only one section open at a time)", async () => {
    render(<MobileMenu isOpen={true} onClose={mockOnClose} />);

    // Expand About TU
    const aboutButton = screen.getByRole("button", { name: /About TU/i });
    fireEvent.click(aboutButton);
    expect(
      await screen.findByRole("link", { name: "Educational Philosophy" })
    ).toBeInTheDocument();

    // Expand Admission - About TU should close
    const admissionButton = screen.getByRole("button", { name: /Admission/i });
    fireEvent.click(admissionButton);
    expect(
      await screen.findByRole("link", { name: "Undergraduate Admissions" })
    ).toBeInTheDocument();

    // Educational Philosophy should not be visible anymore
    expect(
      screen.queryByRole("link", { name: "Educational Philosophy" })
    ).not.toBeInTheDocument();
  });
});
