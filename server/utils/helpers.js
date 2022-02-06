module.exports = {
  // format date (E.g., Feb 6, 2022)
  formatDate: (date) => {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleString("en-us", options);
  },
  // format hour count to 2 decimal places (E.g., 1 => 1.00)
  formatHours: (hours) => {
    return parseFloat(hours).toFixed(2);
  },
};
