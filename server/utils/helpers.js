export function formatDate(date) {
    return new Date(date).toLocaleString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
export function formatDatetime(datetime) {
    const date = new Date(datetime).toLocaleString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const time = new Date(datetime)
        .toLocaleString("en-us", { hour: "numeric", minute: "numeric" })
        .toLowerCase();
    return `${time} on ${date}`;
}
export function formatHours(hours) {
    return parseFloat(hours).toFixed(2);
}
