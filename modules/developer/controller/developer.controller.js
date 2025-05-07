import { developerModel } from "../../../DB/model/developer.model.js";
import { projectModel } from "../../../DB/model/project.model.js";

export const getAllDevelopers = async (req, res) => {
  const developers = await developerModel.findAll({
    include: {
      model: projectModel,
    },
  });
  res.json({ message: "Done", developers });
};

export const addDeveloper = async (req, res) => {
  const { name, description, email, password } = req.body;
  const addedDeveloper = await developerModel.create({
    name,
    description,
    email,
    password,
  });
  res.json({ message: "Added", addedDeveloper });
};
