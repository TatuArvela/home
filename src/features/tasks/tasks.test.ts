import { describe, expect, it } from "vitest";
import { getMonthlyTasks } from "./tasks";

const taskList = {
  3: [
    { id: "1", label: "Task A" },
    { id: "2", label: "Task B" },
  ],
  6: [{ id: "1", label: "Task C" }],
};

describe("getMonthlyTasks", () => {
  it("returns tasks for a configured month", () => {
    expect(getMonthlyTasks(taskList, 3)).toEqual([
      { id: "1", label: "Task A" },
      { id: "2", label: "Task B" },
    ]);
  });

  it("returns empty array for an unconfigured month", () => {
    expect(getMonthlyTasks(taskList, 1)).toEqual([]);
  });
});
