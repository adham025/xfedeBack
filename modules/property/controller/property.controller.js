import { propertyModel } from "../../../DB/model/property.model.js";
import { projectModel } from "../../../DB/model/project.model.js";
import { installmentPlanModel } from "../../../DB/model/installmentPlan.model.js";

// Add a new property
export const addProperty = async (req, res) => {
  try {
    const { name, projectId, status, type, price, installmentPlan } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    // Check if project exists
    const project = await projectModel.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let installmentPlanId = null;
    if (installmentPlan) {
      const newInstallmentPlan = await installmentPlanModel.create({
        propertyId: null, 
        downpayment: installmentPlan.downpayment,
        paymentDuration: installmentPlan.paymentDuration,
        installmentAmount: installmentPlan.installmentAmount,
      });
      installmentPlanId = newInstallmentPlan.id;
    }

    const property = await propertyModel.create({
      name,
      projectId,
      status,
      type,
      price,
      installmentPlanId,
      images,
    });

    if (installmentPlanId) {
      await installmentPlanModel.update(
        { propertyId: property.id },
        { where: { id: installmentPlanId } }
      );
    }

    res.status(201).json({ message: "Property added successfully", property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding property", error: error.message });
  }
};

// Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.findAll({
      include: [
        {
          model: projectModel,
          attributes: ["name", "category", "city", "region"],
        },
        {
          model: installmentPlanModel,
          attributes: ["downpayment", "paymentDuration", "installmentAmount"],
        },
      ],
    });
    res.status(200).json({ properties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching properties", error: error.message });
  }
};

// Get property by ID
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await propertyModel.findByPk(id, {
      include: [
        {
          model: projectModel,
          attributes: ["name", "category", "city", "region"],
        },
        {
          model: installmentPlanModel,
          attributes: ["downpayment", "paymentDuration", "installmentAmount"],
        },
      ],
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching property", error: error.message });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, type, price, installmentPlan } = req.body;
    const newImages = req.files ? req.files.map((file) => file.path) : [];

    const property = await propertyModel.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Update installment plan if provided
    if (installmentPlan) {
      if (property.installmentPlanId) {
        await installmentPlanModel.update(
          {
            downpayment: installmentPlan.downpayment,
            paymentDuration: installmentPlan.paymentDuration,
            installmentAmount: installmentPlan.installmentAmount,
          },
          { where: { id: property.installmentPlanId } }
        );
      } else {
        const newInstallmentPlan = await installmentPlanModel.create({
          propertyId: id,
          downpayment: installmentPlan.downpayment,
          paymentDuration: installmentPlan.paymentDuration,
          installmentAmount: installmentPlan.installmentAmount,
        });
        property.installmentPlanId = newInstallmentPlan.id;
      }
    }

    // Update property
    const updatedProperty = await property.update({
      name: name || property.name,
      status: status || property.status,
      type: type || property.type,
      price: price || property.price,
      images:
        newImages.length > 0
          ? [...property.images, ...newImages]
          : property.images,
    });

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating property", error: error.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await propertyModel.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Delete associated installment plan if exists
    if (property.installmentPlanId) {
      await installmentPlanModel.destroy({
        where: { id: property.installmentPlanId },
      });
    }

    await property.destroy();
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting property", error: error.message });
  }
};
