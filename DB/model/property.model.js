import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const propertyModel = sequelize.define("Property", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  installmentPlanId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "[]",
    get() {
      const rawValue = this.getDataValue("images");
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue("images", JSON.stringify(value));
    },
  },
});

export default propertyModel;
