import { Model, DataTypes, Sequelize, HasManyGetAssociationsMixin, Association } from "sequelize";
import { Organization as OrganizationAttributes } from "../attributes";
import User from "./User";

export type OrganizationCreationAttributes = OrganizationAttributes;

class Organization extends Model implements OrganizationAttributes {
    public id?: number;
    public code: string;
    public name: string;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    public getUser?: HasManyGetAssociationsMixin<User>

    public readonly user?: User[];

    public static associations: {
        user: Association<Organization, User>
    }

    static initModel(sequelize: Sequelize): void {
        Organization.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            code: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },{
            sequelize,
            underscored: true,
            tableName: "organizations"
        })
    }

    public static associateModel(): void {
        Organization.hasMany(User, { foreignKey: 'organizationId', sourceKey: 'id', as: 'user' })
    }

}

export default Organization;