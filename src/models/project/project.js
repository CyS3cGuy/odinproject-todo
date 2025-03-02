class Project {
    #logger;
    #id;
    #title;
    #description;
    #category;
    #completion;
    #tasks;

    constructor(logger, id, title, description, category) {
        this.#logger = logger;
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#category = category && category !== "" ? category : DEFAULT_PROJECT_CATEGORY;
        this.#completion = 0;
        this.#tasks = [];
    }

    get id() {
        return this.#id;
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

    get description() {
        return this.#description;
    }

    set description(string) {
        this.#description = string;
    }

    get category() {
        return this.#category;
    }

    set category(string) {
        this.#category = string;
    }

    addTask(title, note, category, tags, startDate, startTime, dueDate, dueTime) {
        const newTask = new Task(this.#logger, title, note, category, tags, startDate, startTime, dueDate, dueTime);
        this.#tasks.push(newTask);
        this.#logger.log(`New task "${newTask.title}" has been created for project ${this.title}.`, "d", CLASSNAME);
    }

    computePercentageCompletion() {

    }
}

export {Project};