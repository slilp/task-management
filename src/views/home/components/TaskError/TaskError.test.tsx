import { render, screen } from "utils/test-utils";
import TaskError from ".";

describe("TaskError Unit Test", () => {
  const mockProps = {
    id: "mock-id",
    title: "mock-title",
    desc: "mock-desc",
    icon: "/error.png",
  };

  const renderComponent = () => {
    render(<TaskError {...mockProps} />);
  };

  it("Should display title text from title prop", () => {
    renderComponent();
    expect(
      screen.getByTestId(`task-error-${mockProps.id}-title-text`)
    ).toHaveTextContent(mockProps.title);
  });

  it("Should display description text from desc prop", () => {
    renderComponent();
    expect(
      screen.getByTestId(`task-error-${mockProps.id}-desc-text`)
    ).toHaveTextContent(mockProps.desc);
  });
});
