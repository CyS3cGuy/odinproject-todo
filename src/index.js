import "modern-normalize/modern-normalize.css"; 
import "./style.css";
import { Controller } from "./controller/controller";

const controller = new Controller();
const modelPM = controller.model.projectManager;

modelPM.removeProject("");

modelPM.addProject("Billing", "This is for billing purpose", "");
modelPM.addProject("Grocery Shopping", "This is for grocery shopping purpose", "");
modelPM.addProject("", "", "Cool");
modelPM.addProject("", "", "Unnamed");
modelPM.addProject("", "", "Unnamed");

modelPM.removeProject("P-000002");

modelPM.addProject("test again", "", "Test");
modelPM.addProject("another test", "", "Test");

modelPM.removeProject("P-000006");

console.log(modelPM.getAllProjects());