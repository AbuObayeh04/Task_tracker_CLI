import { parseArguments } from "./cli/parser.js";
import { printUsage } from "./cli/diplay.js";
import {
    addTask,
    updateTask,
    deleteTask,
    markInProgress,
    markDone,
    listTasks,
} from "./core/taskManager.js";

const FILE_PATH = "./tasks.json";

const main = () => {
    const [command, ...args] = parseArguments();

    try {
        switch (command) {
            case "add":
                addTask(FILE_PATH, args.join(" "));
                break;
            case "update": {
                const [id, ...words] = args;
                updateTask(FILE_PATH, id, words.join(" "));
                break;
            }
            case "delete":
                deleteTask(FILE_PATH, args[0]);
                break;
            case "mark-in-progress":
                markInProgress(FILE_PATH, args[0]);
                break;
            case "mark-done":
                markDone(FILE_PATH, args[0]);
                break;
            case "list":
                listTasks(FILE_PATH, args[0]);
                break;
            default:
                printUsage();
                process.exitCode = 1;
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
    }
};

main();
