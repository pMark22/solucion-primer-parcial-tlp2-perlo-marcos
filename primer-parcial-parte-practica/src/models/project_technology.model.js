// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ProjectTechnologyModel = sequelize.define(
  "ProjectTechnology",
  {
    // TODO: 1. id: entero, clave primaria y autoincremental.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // TODO: 2. project_id: entero, obligatorio, clave foránea hacia Project.
    project_id: {
      type: DataTypes.INTEGER,
      foreignKey: user_id,
      allowNull: true,
    },
    // TODO: 3. technology_id: entero, obligatorio, clave foránea hacia Technology.
    technology_id: {
      type: DataTypes.INTEGER,
      foreignKey: technology_id,
      allowNull: true,
    },
  },
  {
    // TODO: 4. Desactivar las columnas createdAt y updatedAt.

    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);
