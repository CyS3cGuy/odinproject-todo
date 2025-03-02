import { ProjectManager } from "./project/project-manager";

class Model {
    #projectManager; 
    #logger;

    constructor (logger) {
        this.#projectManager = new ProjectManager(logger);
    }

    get projectManager() {
        return this.#projectManager;
    }
}

export { Model };