import { loadTasks, saveTasks } from "../storage/fileHandler.js";
import { getCurrentTimestamp } from "../utils/helpers.js";
import { printTask } from "../cli/diplay.js";
import {
    validateTaskId,
    validateDescription,
    validateStatus,
} from "../utils/validators.js";

export const getNextId = (tasks) => {
    const IDs = tasks.map((task) => task.id);

    return Math.max(0, ...IDs) + 1;
};

export const findTaskById = (tasks, id) => {
    return tasks.find((task) => task.id === Number(id));
};

export const addTask = (filePath, description) => {
    validateDescription(description);

    const tasks = loadTasks(filePath);
    const newTask = {
        id: getNextId(tasks),
        description: description.trim(),
        status: "todo",
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
    };

    tasks.push(newTask);
    saveTasks(filePath, tasks);
    console.log(`Task added successfully (ID: ${newTask.id}) `);
};

export const listTasks = (filePath, status) => {
    if (status !== undefined) validateStatus(status);

    const tasks = loadTasks(filePath);
    const filtered = status
        ? tasks.filter((task) => task.status === status)
        : tasks;

    if (filtered.length === 0) {
        console.log("No tasks found");
        return;
    }

    filtered.forEach((task) => printTask(task));
};

export const updateTask = (filePath, id, description) => {
    validateDescription(description);
    const validId = validateTaskId(filePath, id);

    const tasks = loadTasks(filePath);
    const task = findTaskById(tasks, validId);

    task.description = description.trim();
    task.updatedAt = getCurrentTimestamp();

    saveTasks(filePath, tasks);
    console.log(`Task updated successfully (ID: ${task.id})`);
};

export const deleteTask = (filePath, id) => {
    const validId = validateTaskId(filePath, id);

    const tasks = loadTasks(filePath);
    const remaining = tasks.filter((task) => task.id !== validId);

    saveTasks(filePath, remaining);
    console.log(`Task deleted successfully (ID: ${validId})`);
};

// shared logic for markInProgress / markDone
const changeStatus = (filePath, id, status) => {
    const validId = validateTaskId(filePath, id);

    const tasks = loadTasks(filePath);
    const task = findTaskById(tasks, validId);

    task.status = status;
    task.updatedAt = getCurrentTimestamp();

    saveTasks(filePath, tasks);
    console.log(`Task ${task.id} marked as ${status}`);
};

export const markInProgress = (filePath, id) => {
    changeStatus(filePath, id, "in-progress");
};

export const markDone = (filePath, id) => {
    changeStatus(filePath, id, "done");
};
