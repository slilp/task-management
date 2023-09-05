import { render, screen } from "utils/test-utils";
import TaskContentSection from ".";
import { TaskStatus } from "views/home/utils/type";
import useFetchTodoList from "../../hooks/useFetchTodoList";
import useInterSection from "../../hooks/useIntersection";

jest.mock("../../hooks/useFetchTodoList");
jest.mock("../../hooks/useInterSection");

(useInterSection as jest.Mock).mockReturnValue({
  ref: null,
  entry: {
    isIntersecting: false,
  },
});

const useFetchTodoListLoading = () => {
  (useFetchTodoList as jest.Mock).mockReturnValue({
    isFetching: true,
    isError: false,
    data: null,
  });
};

const useFetchTodoListError = () => {
  (useFetchTodoList as jest.Mock).mockReturnValue({
    isFetching: false,
    isError: true,
    data: null,
  });
};

const mockTodoListData = {
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
      description: "Set up a time to discuss project progress with the client",
      createdAt: "2023-04-24T11:00:00Z",
      status: TaskStatus.TODO,
    },
  ],
  pageNumber: 0,
  totalPages: 30,
};

const useFetchTodoListSuccess = (data = mockTodoListData) => {
  (useFetchTodoList as jest.Mock).mockReturnValue({
    isFetching: false,
    isError: false,
    data,
  });
};

describe("TabStatusSection Unit Tests", () => {
  const mockProps = {
    tabStatus: TaskStatus.TODO,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(<TaskContentSection {...mockProps} />);
  };

  it("Should render skeleton loading", () => {
    useFetchTodoListLoading();
    renderComponent();
    const skeletons = screen.getAllByTestId("task-skeleton");
    expect(skeletons).toHaveLength(4);
  });

  it("Should render error state", () => {
    useFetchTodoListError();
    renderComponent();
    const errorText = screen.getByText("Something wrong");
    expect(errorText).toBeInTheDocument();
  });

  it("Should render empty state", () => {
    useFetchTodoListSuccess({
      tasks: [],
      pageNumber: 0,
      totalPages: 0,
    });
    renderComponent();
    const emptyText = screen.getByText("Your task is empty");
    expect(emptyText).toBeInTheDocument();
  });

  it("Should render data", async () => {
    useFetchTodoListSuccess();
    renderComponent();
    mockTodoListData.tasks.map((task, i) => {
      if (i === mockTodoListData.tasks.length - 1) {
        expect(screen.getByTestId("task-group-last-item")).toBeInTheDocument();
      }
      const card = screen.getByTestId(`task-card-${task.id}`);
      expect(card).toBeInTheDocument();

      const title = screen.getByTestId(`task-card-${task.id}-title`);
      expect(title).toHaveTextContent(task.title);

      const desc = screen.getByTestId(`task-card-${task.id}-desc`);
      expect(desc).toHaveTextContent(task.description);
    });
  });

  it("Should fetch new data when detect end scroll", async () => {
    (useInterSection as jest.Mock).mockReturnValue({
      ref: null,
      entry: {
        isIntersecting: true,
      },
    });
    useFetchTodoListSuccess();
    renderComponent();
    expect(useFetchTodoList).toBeCalledWith({
      status: TaskStatus.TODO,
      offset: 1,
      limit: 10,
    });
  });
});
