import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const TypeORMModule: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'raja.db.elephantsql.com',
    port: 5432,
    username: 'albtuqha',
    password: 'MbQD-xNrLDKdjyr2bHkRJl3wXnfuNkpC',
    database: 'albtuqha',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}


@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})
export class DatabaseModule { }
