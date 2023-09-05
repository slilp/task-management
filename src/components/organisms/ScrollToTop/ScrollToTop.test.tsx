import ScrollToTop from ".";
import { render, screen, fireEvent } from "utils/test-utils";

global.scrollTo = jest.fn();

describe("ScrollToTop Unit Tests", () => {
  const renderComponent = () => {
    render(<ScrollToTop />, true);
  };

  it("Should render scroll to top button", () => {
    renderComponent();
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(screen.getByTestId("scroll-to-top-btn")).toBeInTheDocument();
  });

  it("Should not render scroll to top button if scroll lower than 50", () => {
    renderComponent();
    fireEvent.scroll(window, { target: { scrollY: 40 } });
    expect(screen.queryByTestId("scroll-to-top-btn")).not.toBeInTheDocument();
  });

  it("Should scroll to top when click the button", () => {
    renderComponent();
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    const btn = screen.getByTestId("scroll-to-top-btn");
    fireEvent.click(btn);
    expect(global.scrollTo).toBeCalledWith({ top: 0, behavior: "smooth" });
  });
});
