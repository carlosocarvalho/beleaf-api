import {
    Table,
    Model,
    Column,
    DataType,
    BeforeCreate,
    IsUUID,
    PrimaryKey,
    AllowNull,
    IsNull,
    IsEmail,
    IsDate
} from "sequelize-typescript";

import * as uuid from 'uuid/v4';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export class UserResponse {

    id: string;
    username: string;
    createdAt: Date;
    email: string;
    fullName: string;
    token?: string;
}

@Table({ timestamps: true, tableName: 'users', modelName: 'usuario' })
export class UserModel extends Model<UserModel> {

    @IsUUID(4)
    @PrimaryKey @Column({ type: DataType.UUIDV4, primaryKey: true })
    id: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING, unique: true })
    username: string;

    @AllowNull(false)
    @IsEmail @Column({ type: DataType.STRING, unique: true })
    email: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    password: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    fullName: string;

    @AllowNull(false)
    @IsDate @Column({ type: DataType.DATE })
    birthDay: string;

    @BeforeCreate static async createUUID(instance: UserModel) {
        instance.id = await uuid();
    }

    @BeforeCreate static async hasPassword(instance: UserModel) {
        instance.password = await bcrypt.hash(instance.password, 10);
    }

    async checkPassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password)
    }


    toResponseObject(showToken: boolean = true): UserResponse {
        const {
            id,
            createdAt,
            username,
            token,
            email,
            fullName
        } = this;
        const responseObject: UserResponse = {
            id,
            createdAt,
            username,
            email,
            fullName
        };
        if (showToken) {
            responseObject.token = token;
        }

        return responseObject;
    }

    private get token(): string {
        const { id, username } = this;
        return jwt.sign({
            id,
            username
        }, process.env.SECRET, {
                expiresIn: process.env.TOKEN_TIMEOUT
            });
    }

}
