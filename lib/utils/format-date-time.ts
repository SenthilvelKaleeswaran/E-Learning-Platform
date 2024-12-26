export const formatDateTime = (inputDate = new Date()) => {
  // Ensure input is a valid Date object
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid Date");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { date: formattedDate, time: formattedTime };
};
