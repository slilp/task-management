import { fireEvent, render, screen } from "utils/test-utils";
import TabStatusSection from ".";
import { TaskStatus } from "views/home/utils/type";

const tabsData = [
  {
    val: TaskStatus.TODO,
    label: "To-do",
  },
  {
    val: TaskStatus.DOING,
    label: "Doing",
  },
  {
    val: TaskStatus.DONE,
    label: "Done",
  },
];

describe("TabStatusSection Unit Tests", () => {
  const mockSetTabStatus = jest.fn();
  const mockProps = {
    tabStatus: TaskStatus.DOING,
    setTabStatus: mockSetTabStatus,
  };

  const renderComponent = () => {
    render(<TabStatusSection {...mockProps} />);
  };

  it("Should display all tabs", () => {
    renderComponent();
    tabsData.map((tab) => {
      if (tab.val === mockProps.tabStatus) {
        expect(
          screen.getByTestId(`tab-chip-${tab.val}-active-btn`)
        ).toBeInTheDocument();
      } else {
        expect(
          screen.getByTestId(`tab-chip-${tab.val}-btn`)
        ).toBeInTheDocument();
      }
    });
  });

  it("Should call setTabstatus when click", () => {
    renderComponent();
    const tabBtn = screen.getByTestId(`tab-chip-${tabsData[0].val}-btn`);
    fireEvent.click(tabBtn);
    expect(mockSetTabStatus).toBeCalledTimes(1);
  });
});
