import { Dialect, Options, Sequelize } from "sequelize";

class SequelizeConnection {
    private static instance: Sequelize;

    static getInstance(): Sequelize {
        if (!SequelizeConnection.instance) {
            const dbConfig = {} as Options;
            dbConfig.host = 'localhost';
            dbConfig.ssl = false;
            dbConfig.dialect = 'sqlite' as Dialect;
            dbConfig.logging = false;
            dbConfig.storage = 'db.sqlite';
            dbConfig.database = 'sqlite_db';

            SequelizeConnection.instance = new Sequelize(
                dbConfig
            );
        }
        return SequelizeConnection.instance;
    }

    static async connect(): Promise<Sequelize> {
        const sequelize = SequelizeConnection.getInstance();

        try {
            await sequelize.authenticate();
            console.log('Database connection worked!');
            return sequelize;
        } catch (ex) {
            console.error('Error while creation of connection: ' + ex);
            return sequelize;
        }
    }
}

export default SequelizeConnection;