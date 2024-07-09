export const  getNormalDateAndTime = (isoDAte: string) => {

    // Convert ISO date to a Date object
const date = new Date(isoDAte);

// Define options for formatting
// Define options for formatting
const options = {
    timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
    weekday: "long" as const,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  
  // Convert to local Indian date and time
  const localDateString = date.toLocaleString("en-IN", options as any);
  return localDateString
}