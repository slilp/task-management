import React from "react";
import { PanInfo, motion, useAnimate } from "framer-motion";
import Image from "next/image";
import { transformTime } from "views/home/utils/transformHelper";

type TaskCardProps = {
  id: string;
  title: string;
  desc?: string;
  createdAt: string;
  onDeleteTask: (id: string) => void;
};

function TaskCard({ id, title, desc, createdAt, onDeleteTask }: TaskCardProps) {
  const [scope, animate] = useAnimate();

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.x < -200 || info.velocity.x < -500) {
      animate(scope.current, { x: "-100%" }, { duration: 0.2 });
      setTimeout(() => onDeleteTask(id), 200);
    } else {
      animate(scope.current, { x: 0, opacity: 1 }, { duration: 0.5 });
    }
  }

  return (
    <motion.div
      style={{
        overflow: "hidden",
        willChange: "transform",
        cursor: "grab",
      }}
      whileTap={{ cursor: "grabbing" }}
      layout
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      className="relative"
    >
      <div className="absolute h-full right-0 bg-red-400 w-full -z-40 flex justify-end p-3 pr-5 rounded-[0.8rem]">
        <div className="flex gap-3 items-center">
          <span className="text-white text-sm">Delete</span>
          <div>
            <Image alt="bin" src="/bin.png" height={24} width={24} />
          </div>
        </div>
      </div>
      <motion.div
        data-testid={`task-card-${id}`}
        drag="x"
        dragDirectionLock
        onDragEnd={handleDragEnd}
        ref={scope}
        className="border rounded-xl p-3"
        style={{ backgroundColor: "#fdfdfc" }}
      >
        <div className="flex justify-between gap-2">
          <span data-testid={`task-card-${id}-title`} className="font-semibold">
            <span className="mr-1">🕥 </span>
            {title}
          </span>
          <span data-testid={`task-card-${id}-time`} className="text-gray-500 ">
            {transformTime(createdAt)}
          </span>
        </div>
        <p
          data-testid={`task-card-${id}-desc`}
          className="text-gray-500 text-sm"
        >
          {desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default TaskCard;
