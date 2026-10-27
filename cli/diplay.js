export const printTask = (task) => {
    const sign =
        task.status === "todo" ? " " : task.status === "done" ? "X" : "~";
    console.log(`[${sign}] ${task.id}  - ${task.description} (${task.status})`);
};

export const printUsage = () => {
    console.log(`Usage: node index.js <command> [arguments]
Commands:
  add <description>          Add a new task
  update <id> <description>  Update a task
  delete <id>                Delete a task
  mark-in-progress <id>      Mark a task as in progress
  mark-done <id>             Mark a task as done
  list                       List all tasks
  list done                  List completed tasks
  list todo                  List tasks not started
  list in-progress           List tasks in progress`);
};
