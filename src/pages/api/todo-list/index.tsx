import axios, { AxiosError, isAxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { TodoListResponse } from "views/home/utils/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { status, offset, limit } = req.query;
    const response = await axios.get<TodoListResponse>(
      `${process.env.NEXT_PUBLIC_TODOLIST_URL}/todo-list?status=${status}&offset=${offset}&limit=${limit}&sortBy=createdAt&isAsc=true`
    );
    res.status(200).json(response.data);
  } catch (error: unknown | AxiosError) {
    if (isAxiosError(error)) {
      res
        .status(error.response?.data.statusCode)
        .json({ message: error.response?.data.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
