import React from "react";
import { transformDate } from "views/home/utils/transformHelper";
import { ITask } from "views/home/utils/type";
import TaskCard from "../TaskCard";

type TaskDateSectionProps = {
  taskDate: string;
  tasks: ITask[];
  onDeleteTask: (id: string) => void;
};

function TaskDateSection({
  onDeleteTask,
  taskDate,
  tasks,
}: TaskDateSectionProps) {
  return (
    <>
      <h1
        data-testid={`task-date-${taskDate}-date`}
        className="font-bold text-md"
      >
        {transformDate(taskDate)}
      </h1>
      <div className="flex flex-col gap-2 ">
        {tasks.map((task) => (
          <TaskCard
            key={`task-card-${task.id}`}
            id={task.id}
            title={task.title}
            desc={task.description}
            createdAt={task.createdAt}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </>
  );
}

export default TaskDateSection;
