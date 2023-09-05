import React from "react";

function TaskSkeleton() {
  return [1, 2, 3, 4].map((i) => (
    <div
      key={`task-skeleton-${i}`}
      data-testid="task-skeleton"
      className="animate-pulse"
    >
      <div className=" bg-gray-200 rounded-lg w-20 mb-4 h-5" />
      <div className="border rounded-lg p-3 cursor-pointer">
        <div className="flex justify-between">
          <div className="  bg-gray-200 rounded-lg  mb-4 md:w-72 h-5 w-48" />
          <div className=" bg-gray-200 rounded-lg w-20 mb-4 h-5" />
        </div>
        <div className="h-5 bg-gray-200 rounded-lg" />
      </div>
    </div>
  ));
}

export default TaskSkeleton;
