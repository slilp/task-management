import { IGroupDateTask, ITask, TaskStatus } from "./type";

export const transformGroupByDate = (
  existingData: ITask[]
): IGroupDateTask[] => {
  if (existingData.length === 0) return [];

  let newData: IGroupDateTask[] = [];
  let temp = new Map<string, ITask[]>();
  existingData.map((v) => {
    const createDate = v.createdAt.split("T")[0];
    temp.set(createDate, [...(temp.get(createDate) || []), v]);
  });

  temp.forEach(function (value, key) {
    newData.push({
      date: key,
      tasks: value,
    });
  });
  return newData;
};

const MONTHS: { [key: number]: string } = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

export const transformDate = (existingDate: string): string => {
  const temp = existingDate.split("-");
  if (temp.length != 3 || !MONTHS[+temp[1]]) return "";
  return temp[2] + " " + MONTHS[+temp[1]] + " " + temp[0];
};

export const transformTime = (existingDate: string): string => {
  const strTime = existingDate.split("T")[1];
  const times = strTime.split(":");
  if (times.length != 3) return "";
  return times[0] + ":" + times[1];
};
