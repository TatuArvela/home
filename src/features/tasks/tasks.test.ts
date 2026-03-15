import { describe, expect, it } from "vitest";
import { getMonthlyTasks } from "./tasks";

const taskList = {
  3: ["Task A", "Task B"],
  6: ["Task C"],
};

describe("getMonthlyTasks", () => {
  it("returns tasks for a configured month", () => {
    expect(getMonthlyTasks(taskList, 3)).toEqual(["Task A", "Task B"]);
  });

  it("returns empty array for an unconfigured month", () => {
    expect(getMonthlyTasks(taskList, 1)).toEqual([]);
  });
});
