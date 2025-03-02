import { ProjectModel } from "./project/project";

class Model {
    #projectModel; 
    #logger;

    constructor (logger) {
        this.#projectModel = new ProjectModel(logger);
    }

    get projectModel() {
        return this.#projectModel;
    }
}

export { Model };