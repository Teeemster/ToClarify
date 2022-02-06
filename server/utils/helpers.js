module.exports = {
  // format just the date (E.g., Feb 6, 2022)
  formatDate: (date) => {
    return new Date(date).toLocaleString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  },
  // format datetime (E.g., 4:37 pm on Feb 6, 2022)
  formatDatetime: (datetime) => {
    const date = new Date(datetime).toLocaleString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = new Date(datetime)
      .toLocaleString("en-us", { hour: "numeric", minute: "numeric" })
      .toLowerCase();
    return `${time} on ${date}`;
  },
  // format hour count to 2 decimal places (E.g., 1 => 1.00)
  formatHours: (hours) => {
    return parseFloat(hours).toFixed(2);
  },
};
