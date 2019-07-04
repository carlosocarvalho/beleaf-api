import {transActions} from './../helpers/index';
import {UserModel} from './user.model';
import {Injectable, Inject, HttpException, HttpStatus} from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY')private readonly USER_REPOSITORY : typeof UserModel) {}


    async findAll(params? : object): Promise < UserModel[] > {
        return await this.USER_REPOSITORY.findAll(params || {})
    }

    async find(id : string): Promise < UserModel > {
        return await this.USER_REPOSITORY.findOne(
            {where: {
                    id
                }}
        )
    }

    async login(data : UserModel) {
        const {username, password} = data
        const user = await this.USER_REPOSITORY.findOne({where: {
                username
            }});
        let failMessage = null
        if (! user) {
            failMessage = transActions('fail.auth.user')
        }

        if (user && await user.checkPassword(password) === false) {
            failMessage = transActions('fail.auth.password')
        }
        if (failMessage !== null) {
            throw new HttpException({
                message: failMessage
            }, HttpStatus.BAD_REQUEST)

        }

        return user.toResponseObject()

    }


    async update(id : string, data : any): Promise < any > {
        return await this.USER_REPOSITORY.update(data, {where: {
                id
            }});
    }

    async delete(id : string): Promise < number > {
        return this.USER_REPOSITORY.destroy(
            {where: {
                    id
                }}
        )
    }

    async create(data : UserModel): Promise < any > {
        return await this.USER_REPOSITORY.create(data)
    }
}
