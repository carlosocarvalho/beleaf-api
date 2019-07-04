import {UserModel} from '../user/user.model';
import {ProductModel} from '../product/product.model';
import {Sequelize} from 'sequelize-typescript'

export const databaseProviders = [{
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'raja.db.elephantsql.com',
                port: 5432,
                username: 'albtuqha',
                password: 'MbQD-xNrLDKdjyr2bHkRJl3wXnfuNkpC',
                database: 'albtuqha'
            });
            sequelize.addModels([ProductModel, UserModel]);
            await sequelize.sync();
            return sequelize;
        }
    },];
