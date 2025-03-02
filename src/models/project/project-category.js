const DEFAULT_PROJECT_CATEGORY = "General";
const CLASSNAME = "ProjectCategoryM";

class ProjectCategoryModel {
    #logger
    #categories;

    constructor(logger) {
        this.#categories = [DEFAULT_PROJECT_CATEGORY];
        this.#logger = logger;
    }

    get categories() {
        return this.#categories;
    }

    addNewCategory(category) {
        if (!category || category === "") {
            this.#logger.log(`Empty category specified. Default to "${DEFAULT_PROJECT_CATEGORY}" category.`, "d", CLASSNAME);
            return;   
        }

        let categoryExist = this.#categories.find(each => each === category);

        if (categoryExist) {
            this.#logger.log(`Category ${categoryExist} already exists. No new category added`, "d", CLASSNAME);
            return;
        }

        this.#categories.push(category);
        this.#logger.log(`Category ${category} has been added.`, "d", CLASSNAME);
    }

    removeCategory(category) {
        if (!category || category === "") {
            this.#logger.log(`Empty category specified. Nothing is removed.`, "e", CLASSNAME);
            return;   
        }

        let categoryIndexToBeRemoved = this.#categories.findIndex(each => each === category);

        if (!categoryIndexToBeRemoved) {
            this.#logger.log(`No such category "${this.#categories[categoryIndexToBeRemoved]}" found.`, "e", CLASSNAME);
            return;
        }

        this.#categories.splice(categoryIndexToBeRemoved, 1);
        this.#logger.log(`Category ${this.#categories[categoryIndexToBeRemoved]} has been removed.`, "d", CLASSNAME);
    }
}

export { DEFAULT_PROJECT_CATEGORY, ProjectCategoryModel };