function daysPassedSince(date: Date): number {
  // Get the current date
  const currentDate = new Date();

  date.setHours(0, 0, 0)

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - date.getTime();

  // Convert the time difference to days
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

export {
  daysPassedSince
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}