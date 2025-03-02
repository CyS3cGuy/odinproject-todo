import { isValidDate, isValidTime, combineDateTime } from "../../utilities/date-validator";

const TAG_STRING_SEPARATOR = ",";
const CLASSNAME = "Task";

class Task {
    #logger;
    #title;
    #note;
    #category;
    #tags;
    #start;
    #due;
    #isCompleted;

    // All arguments are considered to be in string format
    constructor(logger, title, note, category, tags, startDate, startTime, dueDate, dueTime) {
        this.#logger = logger;
        this.#title = title;
        this.#note = note;
        this.#category = category;
        this.#tags = tags && tags !== "" ? tags.split(TAG_STRING_SEPARATOR) : [];
        this.#start = isValidDate(startDate) && isValidTime(startTime) ? combineDateTime(startDate, startTime) : null;
        this.#due = isValidDate(dueDate) && isValidTime(dueTime) ? combineDateTime(startDate, startTime) : null;
        this.#isCompleted = false;
    }

    get title() {
        return this.#title;
    }

    set title(string) {
        if (string === "") {
            this.#logger.log(`Title cannot be empty.`, "e", CLASSNAME);
            return;
        }
        this.#title = string;
    }

    get note() {
        return this.#note;
    }

    set note(string) {
        this.#note = string;
    }

    get category() {
        return this.#category;
    }

    set category(string) {
        this.#category = string;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    set isCompleted(hasCompleted) {
        this.#isCompleted = hasCompleted;
    }


    get tags() {
        return this.#tags;
    }

    addTag(newTag) {
        const duplicatedTag = this.#tags.find(tag => tag.title === newTag);

        if (duplicatedTag) {
            this.#logger.log(`Duplicated tags detected.`, "e", CLASSNAME);
            return;
        }
        this.#tags.push(newTag);
        this.#logger.log(`Tag "${newTag}" is created for task "${this.#title}".`, "d", CLASSNAME);
    }

    removeTag(tagToRemove) {
        const tagIndexToRemove = this.#tags.findIndex(tag => tag.title === tagToRemove);

        if (!tagIndexToRemove) {
            this.#logger.log(`No tag named "${this.#tags[tagIndexToRemove]}" found.`, "e", CLASSNAME);
        }

        this.#tags.splice(tagIndexToRemove, 1);
        this.#logger.log(`Tag "${this.#tags[tagIndexToRemove]}" has been removed from task "${this.#title}".`, "d", CLASSNAME);

    }
}

export { Task };