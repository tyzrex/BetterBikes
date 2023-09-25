export const convertToLocalTime = (date: Date) => {
    const dateObj = new Date(date);
    const kathmanduTime = dateObj.toLocaleString("en-US", {
        timeZone: "Asia/Kathmandu",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return kathmanduTime.split(",")[0];
}

export const convertToLocalTimeHours = (date: string) => {
    const dateObj = new Date(date);
    const kathmanduTime = dateObj.toLocaleString("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
    });
    return kathmanduTime;
}
