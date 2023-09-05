// main
import React, { useState, useEffect, useRef } from "react";

// component
import useFetchTodoList from "../../hooks/useFetchTodoList";
import useIntersection from "../../hooks/useIntersection";
import TaskDateSection from "../TaskDateSection";
import TaskSkeleton from "../TaskSkeleton";
import TaskError from "../TaskError";

// util
import { IGroupDateTask, ITask, TaskStatus } from "views/home/utils/type";
import { transformGroupByDate } from "views/home/utils/transformHelper";

type TaskContentSectionProps = {
  tabStatus: TaskStatus;
};

function TaskContentSection({ tabStatus }: TaskContentSectionProps) {
  const [page, setPage] = useState(0);
  const {
    data: todoData,
    isFetching,
    isError,
  } = useFetchTodoList({
    status: tabStatus,
    offset: page,
    limit: 10,
  });

  const [tempData, setTempData] = useState<ITask[]>([]);
  const [displayData, setDisplayData] = useState<IGroupDateTask[]>([]);

  const refElement = useRef<HTMLDivElement>(null);
  const { ref: refScrollElement, entry } = useIntersection({
    root: refElement.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, [entry]);

  useEffect(() => {
    setDisplayData(transformGroupByDate(tempData));
  }, [tempData]);

  useEffect(() => {
    if (todoData?.tasks) {
      setTempData((prev) => [...prev, ...todoData?.tasks]);
    }
  }, [todoData]);

  const deleteTask = (id: string) => {
    setTempData((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col mt-3 gap-4 w-full lg:w-1/2 mx-auto">
      {displayData.map((v, i) => {
        if (
          i === displayData.length - 1 &&
          (todoData?.totalPages || 0) - 1 !== page
        )
          return (
            <React.Fragment key={`task-group-${v.date}`}>
              <TaskDateSection
                taskDate={v.date}
                tasks={v.tasks}
                onDeleteTask={deleteTask}
              />
              <div data-testid="task-group-last-item" ref={refScrollElement} />
            </React.Fragment>
          );

        return (
          <TaskDateSection
            key={`task-group-${v.date}`}
            taskDate={v.date}
            tasks={v.tasks}
            onDeleteTask={deleteTask}
          />
        );
      })}
      {!isFetching && displayData.length === 0 && !isError && (
        <TaskError
          id="notfound-error"
          title="Your task is empty"
          desc="It's time to create one !"
          icon="/notfound.png"
        />
      )}
      {isError && (
        <TaskError
          id="api-error"
          title="Something wrong"
          desc="Please try agian later"
          icon="/error.png"
        />
      )}
      {isFetching && <TaskSkeleton />}
    </div>
  );
}

export default TaskContentSection;
