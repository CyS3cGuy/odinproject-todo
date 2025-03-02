import { isValid, parse, format } from "date-fns";

// Check if a date string is a valid date
function isValidDate(dateString, format = "yyyy-MM-dd") {
    const parsedDate = parse(dateString, format, new Date());
    return isValid(parsedDate);
}

// Check if a time string is a valid time
// Works in 24 hour format
function isValidTime(timeStr) {
    return isValid(parse(timeStr, "HH:mm", new Date()));
  }

// Combine both date and time 
// return date object
// Example combineDateTime("2024-02-27", "14:30")
function combineDateTime(dateStr, timeStr) {
    return parse(`${dateStr} ${timeStr}`, "yyyy-MM-dd HH:mm", new Date());
}

// Split a date object into the corresponding date string and time string
function splitDateTime(dateObj) {
    return {
        date: format(dateObj, "yyyy-MM-dd"), // "YYYY-MM-DD"
        time: format(dateObj, "HH:mm") // "HH:MM"
    };
}

export { isValidDate, isValidTime, combineDateTime, splitDateTime };