import React from "react";
import TapChip from "../TabChip";
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

type TapStatusSectionProps = {
  tabStatus: TaskStatus;
  setTabStatus: React.Dispatch<React.SetStateAction<TaskStatus>>;
};

function TabStatusSection({ tabStatus, setTabStatus }: TapStatusSectionProps) {
  return (
    <div className="flex space-x-3 bg-gray-100 rounded-3xl p-2 w-full lg:w-1/2">
      {tabsData.map((tab, idx) => {
        return (
          <TapChip
            id={tab.val}
            key={`tab-status-${tab.val}`}
            isActive={tabStatus === tab.val}
            onClick={() => setTabStatus(tab.val)}
          >
            {tab.label}
          </TapChip>
        );
      })}
    </div>
  );
}

export default TabStatusSection;
