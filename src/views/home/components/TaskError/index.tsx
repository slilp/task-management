import React from "react";
import Image from "next/image";

type TaskErrorProp = {
  id: string;
  title: string;
  desc?: string;
  icon: string;
};

function TaskError({ id, title, icon, desc }: TaskErrorProp) {
  return (
    <div className="h-56 flex flex-col justify-center items-center">
      <Image
        data-testid={`task-error-${id}-img`}
        alt="error"
        src={icon}
        height={50}
        width={50}
      />
      <p
        data-testid={`task-error-${id}-title-text`}
        className="text-2xl text-gray-400"
      >
        {title}
      </p>
      <p
        data-testid={`task-error-${id}-desc-text`}
        className="text-md text-gray-400"
      >
        {desc}
      </p>
    </div>
  );
}

export default TaskError;
