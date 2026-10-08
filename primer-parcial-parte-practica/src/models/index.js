// * ARCHIVO A COMPLETAR
import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ProjectModel } from "./project.model.js";
import { TechnologyModel } from "./technology.model.js";
import { ProjectTechnologyModel } from "./project_technology.model.js";

// TODO: 1. Definir la relación 1:1 entre User y Profile con los alias profile (en User) y user (en Profile), usando la FK user_id.

UserModel.hasOne(Profile, {
  foreignKey: "user_id",
  as: "profile",
});

ProfileModel.belongsTo(Profile, {
  foreignKey: "user_id",
  as: "profile",
});

// TODO: 2. Definir la relación 1:N entre User y Project con los alias projects (en User) y leader (en Project), usando la FK leader_id.

UserModel.hasMany(Project, {
  foreignKey: "leader_id",
  as: "projects",
  onDelete: "CASCADE",
});

// Relación inversa
ProjectModel.belongsTo(Project, {
  foreignKey: "leader_id",
  as: "projects",
});

// TODO: 3. Definir la relación N:M entre Project y Technology con los alias technologies y projects, a través de ProjectTechnologyModel y al mismo tiempo configurar la eliminación en cascada para ambos.

ProjectModel.belongsToMany(Technology, {
  through: ProjectTechnology,
  foreignKey: "article_id",
  as: "technologies",
  onUpdate: "CASCADA",
});

ProjectTechnologyModel.belongsToMany(Technology, {
  through: ProjectTechnology,
  foreignKey: "user_id",
  as: "technologies",
});

// ? Los controladores base de users y technologies ya consultan estas relaciones por alias: deben coincidir.

export {
  UserModel,
  ProfileModel,
  ProjectModel,
  TechnologyModel,
  ProjectTechnologyModel,
};
