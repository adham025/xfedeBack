import { developerModel } from "./developer.model.js";
import { projectModel } from "./project.model.js";
import { propertyModel } from "./property.model.js";
import { installmentPlanModel } from "./installmentPlan.model.js";

// Function to set up all relations
export const setupRelations = () => {
  // Developer - Project relations
  // One Developer can have many Projects
  developerModel.hasMany(projectModel, {
    foreignKey: "developerId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  projectModel.belongsTo(developerModel, { foreignKey: "developerId" });

  // Project - Property relations
  // One Project can have many Properties
  projectModel.hasMany(propertyModel, {
    foreignKey: "projectId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  propertyModel.belongsTo(projectModel, { foreignKey: "projectId" });

  // Property - InstallmentPlan relations
  // One Property has one InstallmentPlan
  propertyModel.belongsTo(installmentPlanModel, {
    foreignKey: "installmentPlanId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  installmentPlanModel.hasOne(propertyModel, {
    foreignKey: "installmentPlanId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
