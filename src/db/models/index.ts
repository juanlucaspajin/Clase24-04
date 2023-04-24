import SequelizeConnection from "../SequelizeConnection";
import Organization from "./Organization";
import User from "./User";

const sequelize = SequelizeConnection.getInstance();

Organization.initModel(sequelize);
User.initModel(sequelize);

Organization.associateModel();
User.associateModel();

export const db = {
    sequelize,
    Organization,
    User
};