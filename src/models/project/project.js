import { Task } from "../task/task";
import { DEFAULT_PROJECT_CATEGORY, ProjectCategoryModel } from "./project-category";

const CLASSNAME = "ProjectM";
const DEFAULT_UNNAMED_PROJECT_TITLE = "Unnamed Project ";
const PROJECT_ID_LENGTH = 6;
const PROJECT_ID_START = "P";


class ProjectModel {
    #projects;
    #logger;
    #categoryModel;

    constructor(logger) {
        this.#projects = [];
        this.#logger = logger;
        this.#categoryModel = new ProjectCategoryModel(logger);
    }

    validateProjectTitle(title) {

        if (title && title !== "") {
            return title;
        }
        let allUnnamedProjects = this.#projects.filter(project => project.title.includes(DEFAULT_UNNAMED_PROJECT_TITLE));

        if (allUnnamedProjects.length === 0) {
            return `${DEFAULT_UNNAMED_PROJECT_TITLE}1`;
        }

        // Return the maximum number found
        let maxNum = allUnnamedProjects.reduce((tempMax, currentProject) => {
            let currentInt = parseInt(currentProject.title.split(DEFAULT_UNNAMED_PROJECT_TITLE).at(1));

            return Math.max(tempMax, currentInt);
        }, 1);

        // If max number found is 3, add 1 to become 4, then return the full unnamed project string
        return `${DEFAULT_UNNAMED_PROJECT_TITLE}${maxNum + 1}`;
    }

    validateProjectCategory(category) {
        if (category && category !== "") {
            return category;
        }

        return DEFAULT_PROJECT_CATEGORY;
    }

    validateProject(title, category) {
        return {
            validatedTitle: this.validateProjectTitle(title),
            validatedCategory: this.validateProjectCategory(category),
        }
    }

    generateProjectID() {
        if (this.#projects.length === 0) {
            
            return PROJECT_ID_START + "1".padStart(PROJECT_ID_LENGTH, "0"); 
        }

        let numArr = this.#projects.map(project => parseInt(project.id.split(PROJECT_ID_START).at(1)));
        
        let usableNumber = 1;
        while (numArr.includes(usableNumber)) {
            ++usableNumber;
        }

        // May have vulnerabilities because we are limiting the project id length to 6.. what happen after a user created 1000000th project?
        // Nevertheless since this is mock project, so be it... 
        return PROJECT_ID_START + `${usableNumber}`.padStart(PROJECT_ID_LENGTH, "0"); 
    }

    addProject(title, description, category) {
        // Validation
        const {validatedTitle, validatedCategory} = this.validateProject(title, category);
        const generatedID = this.generateProjectID();

        // Logic
        const newProject = new Project(this.#logger, generatedID, validatedTitle, description, validatedCategory);
        this.#projects.push(newProject);
        this.#logger.log(`New project "${generatedID}: ${newProject.title}" has been created.`, "d", CLASSNAME);

        this.#categoryModel.addNewCategory(validatedCategory);
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

export { ProjectModel };