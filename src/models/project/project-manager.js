import { Project } from "./project";
import { Task } from "../task/task";
import { DEFAULT_PROJECT_CATEGORY, ProjectCategoryManager } from "./project-category";
import { validateTitle, validateCategory, generateID } from "../validator/validator";

const CLASSNAME = "ProjectM";
const DEFAULT_UNNAMED_PROJECT_TITLE = "Unnamed Project ";
const PROJECT_ID_LENGTH = 6;
const PROJECT_ID_START = "P-";


class ProjectManager {
    #projects;
    #logger;
    #categoryManager;

    constructor(logger) {
        this.#projects = [];
        this.#logger = logger;
        this.#categoryManager = new ProjectCategoryManager(logger);
    }

    validateProjectTitle(title) {

        return validateTitle(this.#projects, title, DEFAULT_UNNAMED_PROJECT_TITLE);
    }

    validateProjectCategory(category) {
        return validateCategory(category, DEFAULT_PROJECT_CATEGORY);
    }

    generateProjectID() {
        return generateID(this.#projects, PROJECT_ID_START, PROJECT_ID_LENGTH);
    }

    addProject(title, description, category) {
        // Validation
        const validatedTitle = this.validateProjectTitle(title);
        const validatedCategory = this.validateProjectCategory(category);
        const generatedID = this.generateProjectID();

        // Logic
        const newProject = new Project(this.#logger, generatedID, validatedTitle, description, validatedCategory);
        this.#projects.push(newProject);
        this.#logger.log(`New project "${generatedID}: ${newProject.title}" has been created.`, "d", CLASSNAME);

        this.#categoryManager.addNewCategory(validatedCategory);
    }

    removeProject(projectID) {
        let projectIndexToRemove;
        let removedProjectTitle;

        if (this.#projects.length === 0) {
            this.#logger.log(`Empty projects. Nothing to remove.`, "e", CLASSNAME);
            return;
        }

        projectIndexToRemove = this.#projects.findIndex(project => project.id === projectID);

        // If cannot find
        if (projectIndexToRemove === -1) {
            this.#logger.log(`Cannot find project. Cannot remove.`, "e", CLASSNAME);

            return;
        }

        removedProjectTitle = this.#projects[projectIndexToRemove].title;

        // Remove project 
        this.#projects.splice(projectIndexToRemove, 1);
        this.#logger.log(`Project "${removedProjectTitle}" has been removed.`, "d", CLASSNAME);

    }

    getProjectByID(projectID) {
        if (this.#projects.length === 0) {
            this.#logger.log(`Empty projects. No projects to get`, "e", CLASSNAME);
            return;
        }

        return this.#projects.find(project => project.id === projectID);
    }

    getAllProjects() {
        if (this.#projects.length === 0) {
            this.#logger.log(`Empty projects. No projects to get`, "e", CLASSNAME);
            return;
        }

        return this.#projects;
    }
}



export { ProjectManager };