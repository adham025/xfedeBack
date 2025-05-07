import { Op } from "sequelize";
import { projectModel } from "../../../DB/model/project.model.js";
import { developerModel } from "../../../DB/model/developer.model.js";

export const getAllProjects = async (req, res) => {
  const projects = await projectModel.findAll({
    include: {
      model: developerModel,
    },
  });
  res.json({ message: "done", projects });
};

export const getProjectById = async (req, res) => {
  const projectData = await projectModel.findAll({
    where: ({ id } = req.params),
    include: {
      model: developerModel,
    },
  });
  res.json({ message: "done", projectData });
};

export const addProject = async (req, res) => {
  const { name, category, city, region, developerId } = req.body;
  const developer = await developerModel.findByPk(developerId);
  if (!developer) {
    return res.status(404).json({ message: "Developer not found" });
  }
  const addedProject = await projectModel.create({
    name,
    category,
    city,
    region,
    developerId,
  });
  res.json({ message: "Added", addedProject });
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, category, city, region, developerId } = req.body;
  const updatedProject = await projectModel.update(
    { name, category, city, region, developerId },
    {
      where: {
        id,
      },
    }
  );
  console.log(updatedProject);
  if (updatedProject[0]) {
    res.json({ message: "Updated successfully", updatedProject });
  } else {
    res.json({ message: "Invalid id" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const deletedProject = await projectModel.destroy({
    where: {
      id,
    },
  });
  console.log(deletedProject);
  if (deletedProject) {
    res.json({ message: "Deleted" });
  } else {
    res.json({ message: "Invalid id" });
  }
};

