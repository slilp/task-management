import { fireEvent, render, screen, waitFor } from "utils/test-utils";
import Home from ".";
import { TaskStatus } from "views/home/utils/type";
import useFetchTodoList from "views/home/hooks/useFetchTodoList";
import useInterSection from "views/home/hooks/useIntersection";

jest.mock("views/home/hooks/useFetchTodoList");
jest.mock("views/home/hooks/useIntersection");

(useInterSection as jest.Mock).mockReturnValue({
  ref: null,
  entry: {
    isIntersecting: false,
  },
});

const useFetchTodoListSuccess = () => {
  (useFetchTodoList as jest.Mock).mockReturnValue({
    isFetching: false,
    isError: false,
    data: {},
  });
};

describe("Home Unit Tests", () => {
  const renderComponent = () => {
    render(<Home />, true);
  };

  it("Should render session login name", async () => {
    useFetchTodoListSuccess();
    renderComponent();
    expect(screen.getByTestId("hello-section-neme-text")).toHaveTextContent(
      "MockUserName"
    );
  });

  it("Should render - name when no session name", async () => {
    useFetchTodoListSuccess();
    render(<Home />, false);
    expect(screen.getByTestId("hello-section-neme-text")).toHaveTextContent(
      "-"
    );
  });

  it("Should render fetch new status when change tab", async () => {
    useFetchTodoListSuccess();
    renderComponent();
    const doingTab = screen.getByTestId("tab-chip-DOING-btn");
    fireEvent.click(doingTab);
    expect(useFetchTodoList).toBeCalledWith({
      status: TaskStatus.DOING,
      offset: 0,
      limit: 10,
    });
  });
});
