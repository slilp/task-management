import { render, screen } from "utils/test-utils";
import HelloSection from ".";

describe("HelloSection Unit Test", () => {
  it("Should display name from name prop", () => {
    const givenProp = "fake-name";
    render(<HelloSection name={givenProp} pic="/astronaut.png" />);
    expect(screen.getByTestId("hello-section-neme-text")).toHaveTextContent(
      givenProp
    );
  });
});
