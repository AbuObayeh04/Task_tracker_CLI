# Task Tracker CLI

A simple command line application to track and manage your tasks: what you need to do, what you are working on, and what you have finished.

Built with **Node.js** only. No external libraries, just the built-in `fs` module. Tasks are stored in a local JSON file.

> Project idea from [roadmap.sh](https://roadmap.sh/projects/task-tracker).

---

## Features

- Add, update, and delete tasks
- Mark a task as **in progress** or **done**
- List all tasks
- List tasks by status: `todo`, `in-progress`, `done`
- Tasks are saved in `tasks.json` in the current directory (created automatically if it does not exist)
- Friendly error messages for invalid input and a corrupted JSON file

---

## Requirements

- [Node.js](https://nodejs.org/) v18 or higher

---

## Installation

```bash
git clone https://github.com/AbuObayeh04/Task_tracker_CLI.git
cd Task_tracker_CLI
```

There is nothing to install, the project uses built-in Node.js modules only.

---

## Usage

Run commands with `node index.js <command> [arguments]`:

```bash
# Add a new task
node index.js add "Buy groceries"

# Update a task
node index.js update 1 "Buy groceries and cook dinner"

# Delete a task
node index.js delete 1

# Mark a task as in progress or done
node index.js mark-in-progress 1
node index.js mark-done 1

# List all tasks
node index.js list

# List tasks by status
node index.js list todo
node index.js list in-progress
node index.js list done
```

### Commands

| Command                     | Description                     |
| --------------------------- | ------------------------------- |
| `add <description>`         | Add a new task                  |
| `update <id> <description>` | Update a task's description     |
| `delete <id>`               | Delete a task                   |
| `mark-in-progress <id>`     | Mark a task as in progress      |
| `mark-done <id>`            | Mark a task as done             |
| `list`                      | List all tasks                  |
| `list todo`                 | List tasks that are not started |
| `list in-progress`          | List tasks that are in progress |
| `list done`                 | List completed tasks            |

Running the program with no command (or an unknown one) prints the usage guide.

### Example

```bash
$ node index.js add "Buy groceries"
Task added successfully (ID: 1)

$ node index.js add "Write the report"
Task added successfully (ID: 2)

$ node index.js mark-in-progress 1
Task 1 marked as in-progress

$ node index.js mark-done 2
Task 2 marked as done

$ node index.js list
[~] 1  - Buy groceries (in-progress)
[X] 2  - Write the report (done)
```

Status symbols: `[ ]` todo, `[~]` in progress, `[X]` done.

---

## Task Properties

Each task is stored in `tasks.json` with the following properties:

| Property      | Description                                   |
| ------------- | --------------------------------------------- |
| `id`          | Unique identifier of the task                 |
| `description` | Short description of the task                 |
| `status`      | `todo`, `in-progress`, or `done`              |
| `createdAt`   | Date and time the task was created (ISO 8601) |
| `updatedAt`   | Date and time the task was last updated       |

Example `tasks.json`:

```json
[
    {
        "id": 1,
        "description": "Buy groceries",
        "status": "in-progress",
        "createdAt": "2026-10-27T19:00:00.000Z",
        "updatedAt": "2026-10-27T19:05:00.000Z"
    }
]
```

---

## Project Structure

```
task-tracker/
│
├── index.js              # Entry point: reads the command and calls the right function
├── tasks.json            # Created automatically on first run
│
├── storage/
│   └── fileHandler.js    # loadTasks, saveTasks (read/write the JSON file)
│
├── core/
│   └── taskManager.js    # addTask, updateTask, deleteTask, markInProgress, markDone, listTasks, ...
│
├── cli/
│   ├── parser.js         # parseArguments (reads process.argv)
│   └── diplay.js         # printTask, printUsage (everything printed to the user)
│
└── utils/
    ├── helpers.js        # getCurrentTimestamp, isNumeric
    └── validators.js     # validateTaskId, validateStatus, validateDescription
```

Each folder has one responsibility: storage handles the file, core holds the logic, cli handles input and output, and utils holds small shared helpers.

---

## Error Handling

The app handles these cases without crashing:

- Unknown or missing command: prints the usage guide
- Empty or missing description
- Task ID that is not a number, is zero, is negative, is not a whole number, or does not exist
- Invalid status filter (e.g. `list nope`)
- Empty `tasks.json` (treated as no tasks)
- Corrupted `tasks.json` (clear error message, the file is not overwritten)

Errors are printed to `stderr` and the process exits with a non-zero code.

---

## License

ISC
