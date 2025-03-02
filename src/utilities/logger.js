class Log {
    #logMessage;
    #type;
    #timestamp;
    #category;

    constructor(message, type, category) {
        this.#logMessage = message;
        this.#category = category;
        this.#type = type.toLowerCase() === "e"? "ERROR" : type.toLowerCase() === "d"? "DEBUG" : "USER";
        this.#timestamp = new Date().toLocaleString();
        
    }

    get timestamp () {
        return this.#timestamp;
    }

    get type () {
        return this.#type;
    }

    get logMessage() {
        return this.#logMessage;
    }

    get category() {
        return this.#category;
    }

    get fullLogString() {
        return `[${this.#timestamp}] ${this.#category}/${this.#type}: ${this.#logMessage}`;
    }
}

class ConsoleLoggerModel {
    #logs;

    constructor() {
        this.#logs = [];
    }

    log(logMessage, type, category) {
        
        const log = new Log(logMessage, type, category); 
        this.#logs.push(log);
        console.log(log.fullLogString);
    }

    showAllLogs() {
        this.#logs.forEach(logItem => console.log(logItem.fullLogString));
    }
}

export { ConsoleLoggerModel }; 