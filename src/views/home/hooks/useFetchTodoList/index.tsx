import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { TodoListResponse, TaskStatus } from "views/home/utils/type";

interface UseFetchTodoListProps {
  status: TaskStatus;
  offset: number;
  limit: number;
}

const useFetchTodoList = ({
  status = TaskStatus.TODO,
  offset = 0,
  limit = 10,
}: UseFetchTodoListProps): UseQueryResult<TodoListResponse> => {
  return useQuery(["todo-list", status, offset, limit], async () => {
    const response = await axios.get<TodoListResponse>(
      `/api/todo-list?status=${status}&offset=${offset}&limit=${limit}`
    );

    return response.data;
  });
};

export default useFetchTodoList;
