import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const installmentPlanModel = sequelize.define("InstallmentPlan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  downpayment: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentDuration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  installmentAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default installmentPlanModel;
