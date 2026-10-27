export const getCurrentTimestamp = () => {
    return new Date().toISOString();
};

export const isNumeric = (str) => {
    if (typeof str !== "string") return false;

    return str.trim() !== "" && !isNaN(Number(str));
};
