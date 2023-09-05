import NavBar from ".";
import { render, screen, mockUseRouter, fireEvent } from "utils/test-utils";
import { signOut } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      ...mockUseRouter,
    };
  },
}));

jest.mock("next-auth/react", () => ({
  __esModule: true,
  ...jest.requireActual("next-auth/react"),
  signOut: jest.fn(),
}));

describe("NavBar Unit Tests", () => {
  const renderComponent = () => {
    render(<NavBar />, true);
  };

  it("Should render signout button", () => {
    renderComponent();
    const signoutBtn = screen.getByTestId("navbar-signout-btn");
    expect(signoutBtn).toBeInTheDocument();
  });

  it("Should signout when click signout button", async () => {
    (signOut as jest.Mock).mockResolvedValue({ ok: true });
    renderComponent();
    const signoutBtn = screen.getByTestId("navbar-signout-btn");
    fireEvent.click(signoutBtn);
    expect(signOut).toBeCalledTimes(1);
  });
});
