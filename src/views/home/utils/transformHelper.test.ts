import {
  transformDate,
  transformTime,
  transformGroupByDate,
} from "./transformHelper";
import { ITask, TaskStatus } from "./type";

describe("TransformHelper Unit Tests", () => {
  it("Should return data group by date", () => {
    const givenData: ITask[] = [
      {
        id: "e01f8b64-2cf2-4fa2-bc19-7e8fb78c1d45",
        title: "Buy groceries",
        description: "Get milk, bread, and eggs from the store",
        createdAt: "2023-04-24T15:30:00Z",
        status: TaskStatus.TODO,
      },
      {
        id: "239a740c-9819-4b2e-a0d8-dce7b30522aa",
        title: "Finish project report",
        description: "Complete the final draft of the project report",
        createdAt: "2023-04-24T12:45:00Z",
        status: TaskStatus.TODO,
      },
      {
        id: "c64738b1-75c1-4b8e-9b23-d3b5ee6ca08f",
        title: "Schedule meeting with client",
        description:
          "Set up a time to discuss project progress with the client",
        createdAt: "2023-04-24T11:00:00Z",
        status: TaskStatus.TODO,
      },
    ];

    const expectData = [
      {
        date: "2023-04-24",
        tasks: givenData,
      },
    ];

    expect(transformGroupByDate(givenData)).toEqual(expectData);
  });

  it("Should return empty when given data empty", () => {
    expect(transformGroupByDate([])).toEqual([]);
  });

  it("Should return correct date display format", () => {
    const givenData = "2023-04-24";
    const expectData = "24 APR 2023";
    expect(transformDate(givenData)).toBe(expectData);
  });

  it("Should return empty string when given incorrect date input", () => {
    expect(transformDate("not-correct-format")).toBe("");
  });

  it("Should return correct time display format", () => {
    const givenData = "2023-04-24T11:00:00Z";
    const expectData = "11:00";
    expect(transformTime(givenData)).toBe(expectData);
  });

  it("Should return empty string when given incorrect time input", () => {
    expect(transformTime("2023-04-24T11:00")).toBe("");
  });
});
