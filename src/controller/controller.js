import { ConsoleLoggerModel } from "../utilities/logger";
import { Model } from "../models/model";

class Controller {
    #logger;
    #model;

    constructor() {
        this.#logger = new ConsoleLoggerModel();
        this.#model = new Model(this.#logger);
    }

    get model() {
        return this.#model;
    }
}

export { Controller };