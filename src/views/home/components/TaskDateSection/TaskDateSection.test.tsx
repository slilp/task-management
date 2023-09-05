import { render, screen } from "utils/test-utils";
import TaskDateSection from ".";
import { TaskStatus } from "views/home/utils/type";

describe("TaskDateSection Unit Tests", () => {
  const mockOnDeleteTask = jest.fn();
  const mockProps = {
    taskDate: "2023-04-24",
    tasks: [
      {
        id: "e01f8b64-2cf2-4fa2-bc19-7e8fb78c1d45",
        title: "Buy groceries",
        description: "Get milk, bread, and eggs from the store",
        createdAt: "2023-04-24T15:30:00Z",
        status: TaskStatus.TODO,
      },
      {
        id: "239a740c-9819-4b2e-a0d8-dce7b30522aa",
        title: "Finish project report",
        description: "Complete the final draft of the project report",
        createdAt: "2023-04-24T12:45:00Z",
        status: TaskStatus.TODO,
      },
      {
        id: "c64738b1-75c1-4b8e-9b23-d3b5ee6ca08f",
        title: "Schedule meeting with client",
        description:
          "Set up a time to discuss project progress with the client",
        createdAt: "2023-04-24T11:00:00Z",
        status: TaskStatus.TODO,
      },
    ],
    onDeleteTask: mockOnDeleteTask,
  };

  const renderComponent = () => {
    render(<TaskDateSection {...mockProps} />);
  };

  it("Should display date title", () => {
    renderComponent();
    const taskDateTitle = screen.getByTestId(
      `task-date-${mockProps.taskDate}-date`
    );
    expect(taskDateTitle).toHaveTextContent("24 APR 2023");
  });

  it("Should display all tasks in date", () => {
    renderComponent();
    mockProps.tasks.map((task) => {
      const card = screen.getByTestId(`task-card-${task.id}`);
      expect(card).toBeInTheDocument();

      const title = screen.getByTestId(`task-card-${task.id}-title`);
      expect(title).toHaveTextContent(task.title);

      const desc = screen.getByTestId(`task-card-${task.id}-desc`);
      expect(desc).toHaveTextContent(task.description);
    });
  });
});
