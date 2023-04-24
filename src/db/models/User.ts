import { Model, Sequelize, DataTypes } from "sequelize";
import { User as UserAttributes } from "../attributes";
import Organization from "./Organization";

export type UserCreationAttributes = UserAttributes;

class User extends Model implements UserAttributes {

    public id: number;
    public name: string;
    public email: string;
    public phone: string;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public static associations: {

    }

    static initModel(sequelize: Sequelize): void {
        User.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            email: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false
            },
            phone: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            tableName: "user"
        })
    }

    static associateModel(): void {
        User.belongsTo(Organization, {targetKey: 'id', as: 'organization'});
    }
}

export default User;