import "modern-normalize/modern-normalize.css"; 
import "./style.css";
import { Controller } from "./controller/controller";

const controller = new Controller();

controller.model.projectModel.removeProject("");

controller.model.projectModel.addProject("Billing", "This is for billing purpose", "");
controller.model.projectModel.addProject("Grocery Shopping", "This is for grocery shopping purpose", "");
controller.model.projectModel.addProject("", "", "Cool");
controller.model.projectModel.addProject("", "", "Unnamed");
controller.model.projectModel.addProject("", "", "Unnamed");

controller.model.projectModel.removeProject("P000002");

controller.model.projectModel.addProject("test again", "", "Test");
controller.model.projectModel.addProject("another test", "", "Test");

controller.model.projectModel.removeProject("P000006");

console.log(controller.model.projectModel.getAllProjects());