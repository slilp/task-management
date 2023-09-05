import Login from "./index";
import {
  render,
  screen,
  mockUseRouter,
  fireEvent,
  waitFor,
} from "utils/test-utils";
import { signIn } from "next-auth/react";

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
  signIn: jest.fn(),
}));

describe("LoginPage Unit Tests", () => {
  const renderComponent = () => {
    render(<Login />, false);
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should render username field", () => {
    renderComponent();
    const usernameField = screen.getByTestId("textfield-login-username-input");
    expect(usernameField).toBeInTheDocument();
  });

  it("Should render password field", () => {
    renderComponent();
    const passwordField = screen.getByTestId("textfield-login-password-input");
    expect(passwordField).toBeInTheDocument();
  });

  it("Should render sign in button", () => {
    renderComponent();
    const signinBtn = screen.getByTestId("login-btn");
    expect(signinBtn).toBeInTheDocument();
  });

  it("Should display error validate field when empty input and click signin button", async () => {
    renderComponent();
    const signinBtn = screen.getByTestId("login-btn");
    fireEvent.click(signinBtn);
    const usernameFieldErr = await screen.findByTestId(
      "textfield-login-username-error-message"
    );
    expect(usernameFieldErr).toHaveTextContent("required field");
    const passwordFieldErr = screen.getByTestId(
      "textfield-login-password-error-message"
    );
    expect(passwordFieldErr).toHaveTextContent("required field");
  });

  it("Should display error message when signin fail", async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: false });
    renderComponent();
    fireEvent.change(screen.getByTestId("textfield-login-username-input"), {
      target: { value: "mock@email.com" },
    });
    fireEvent.change(screen.getByTestId("textfield-login-password-input"), {
      target: { value: "mock1234" },
    });
    const signinBtn = screen.getByTestId("login-btn");
    fireEvent.click(signinBtn);
    await waitFor(() =>
      expect(screen.getByTestId("login-fail-message")).toHaveTextContent(
        "Invalid username or password"
      )
    );
  });

  it("Should display loading sign in state", async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: true });
    renderComponent();
    fireEvent.change(screen.getByTestId("textfield-login-username-input"), {
      target: { value: "mock@email.com" },
    });
    fireEvent.change(screen.getByTestId("textfield-login-password-input"), {
      target: { value: "mock1234" },
    });
    const signinBtn = screen.getByTestId("login-btn");
    fireEvent.click(signinBtn);
    await waitFor(() => expect(signinBtn).toHaveTextContent("Sign In..."));
  });

  it("Should go to `/` page when signin success", async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: true });
    renderComponent();
    fireEvent.change(screen.getByTestId("textfield-login-username-input"), {
      target: { value: "mock@email.com" },
    });
    fireEvent.change(screen.getByTestId("textfield-login-password-input"), {
      target: { value: "mock1234" },
    });
    const signinBtn = screen.getByTestId("login-btn");
    fireEvent.click(signinBtn);
    await waitFor(() => expect(global.location.pathname).toBe("/"));
  });
});
