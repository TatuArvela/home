export interface Task {
  id: string;
  label: string;
}

export type MonthlyTaskList = Partial<Record<number, Task[]>>;

export function getMonthlyTasks(taskList: MonthlyTaskList, month: number): Task[] {
  return taskList[month] ?? [];
}
