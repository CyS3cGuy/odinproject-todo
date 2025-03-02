import { isValid, parse, format } from "date-fns";

// Validating the title
// Return a specific unnamed string if no title is given
function validateTitle(objArr, title, defaultUnnamed) {

    if (title && title !== "") {
        return title;
    }
    let allUnnamedObjs = objArr.filter(each => each.title.includes(defaultUnnamed));

    if (allUnnamedObjs.length === 0) {
        return `${defaultUnnamed}1`;
    }

    // Return the maximum number found
    let maxNum = allUnnamedObjs.reduce((tempMax, currentObj) => {
        let currentInt = parseInt(currentObj.title.split(defaultUnnamed).at(1));

        return Math.max(tempMax, currentInt);
    }, 1);

    // If max number found is 3, add 1 to become 4, then return the full unnamed project string
    return `${defaultUnnamed}${maxNum + 1}`;
}

// Validating the category
// Return a specific category if no category is given
function validateCategory(category, defaultUnnamed) {
    if (category && category !== "") {
        return category;
    }

    return defaultUnnamed;
}

// Generate a unique ID
// Increase by 1 everytime is used.
// However, a number may be reused if the preceding ID is not taken (i.e. the earlier ID has been removed)
function generateID(objArr, startingIdentifier, idLength) {
    if (objArr.length === 0) {
        
        return startingIdentifier + "1".padStart(idLength, "0"); 
    }

    let numArr = objArr.map(each => parseInt(each.id.split(startingIdentifier).at(1)));
    
    let usableNumber = 1;
    while (numArr.includes(usableNumber)) {
        ++usableNumber;
    }

    // May have vulnerabilities because we are limiting the project id length to 6.. what happen after a user created 1000000th project?
    // Nevertheless since this is mock project, so be it... 
    return startingIdentifier + `${usableNumber}`.padStart(idLength, "0"); 
}


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

export {validateTitle, validateCategory, generateID, isValidDate, isValidTime, combineDateTime, splitDateTime}