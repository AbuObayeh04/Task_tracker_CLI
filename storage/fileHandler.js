import fs from "node:fs";

export const loadTasks = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]), { encoding: "utf-8" });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");

    if (fileData.trim() === "") return [];

    let tasks;
    try {
        tasks = JSON.parse(fileData);
    } catch {
        throw new Error(
            `${filePath} is corrupted (invalid JSON). Fix it or delete it.`,
        );
    }

    if (!Array.isArray(tasks)) {
        throw new Error(`${filePath} is corrupted (expected a list of tasks).`);
    }

    return tasks;
};

export const saveTasks = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
};
