import { isNumeric } from "./helpers.js";
import { loadTasks } from "../storage/fileHandler.js";
import { printUsage } from "../cli/diplay.js";

export const validateTaskId = (filePath, id) => {
    if (!isNumeric(id)) {
        throw new Error("The id is not a number");
    }

    const intgerID = Number(id);

    if (intgerID < 0) {
        printUsage();
        throw new Error("Id not Available Enter POSITIVE NUMBER.");
    } else if (intgerID === 0) {
        printUsage();
        throw new Error("Zero is Unvalid Id");
    } else if (!Number.isInteger(intgerID)) {
        throw new Error("The id must be a whole number");
    }

    const data = loadTasks(filePath);
    const IDs = data.map((task) => task.id);

    if (!IDs.includes(intgerID)) {
        throw new Error(`Task with ID ${intgerID} was not found`);
    }

    return intgerID;
};

export const validateStatus = (status) => {
    const validStatuses = ["todo", "in-progress", "done"];
    if (!validStatuses.includes(status)) {
        throw new Error("Status must be one of: todo, in-progress, done.");
    }
    return status;
};

export const validateDescription = (description) => {
    if (typeof description !== "string" || description.trim() === "") {
        throw new Error("The description can't be empty");
    }
};
