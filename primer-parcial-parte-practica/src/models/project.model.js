// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ProjectModel = sequelize.define("Project", {
  // TODO: 1. code: string, único y obligatorio.

  code: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },

  // TODO: 2. name: string, obligatorio.

  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // TODO: 3. description: texto, obligatorio.

  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // TODO: 4. status: ENUM con los valores planning, in_progress, paused y finished; obligatorio y con planning como valor por defecto.

  status: {
    type: DataTypes.ENUM("in_progress", "paused", "finished"),
    allowNull: true,
    defaultValue: "planning",
  },

  // TODO: 5. start_date: fecha (solo día), obligatoria.

  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  // TODO: 6. budget: decimal, obligatorio.

  budget: {
    type: DataTypes.FLOAT,
  },

  // TODO: 7. leader_id: entero, obligatorio, clave foránea hacia User.

  leader_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    foreiginKey: user_id,
  },
});
