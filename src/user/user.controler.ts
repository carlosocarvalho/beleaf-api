import { AuthGuard } from './../shared/auth.guard';
import { transActions } from './../helpers/index';
import { HandlerError } from './../helpers/handler-errors';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import {
    Controller,
    Get,
    Post,
    Body,
    BadRequestException,
    UseGuards,
    Delete,
    Param,
    HttpCode
} from '@nestjs/common'

@Controller('/v1/users')
export class UserController {


    constructor(private readonly repository: UserService) { }
    @Post('/authentication')
    @HttpCode(200)
    public async authentication(@Body() model: UserModel) {
        return await this.repository.login(model)
    }

    @Post()
    public async create(@Body() model: UserModel): Promise<UserModel> {
        try {
            const created = await this.repository.create(model);
            return created;
        } catch (e) {
            throw new BadRequestException({
                errors: new HandlerError(e.errors).getErrors(),
                message: transActions('fail.create')
            });
        }
    }

    @Get()
    @UseGuards(new AuthGuard())
    public async index(): Promise<UserModel[]> {
        return this.repository.findAll()
    }

    @Get('/me/:id')
    @UseGuards(new AuthGuard())
    public async showMe(@Param() params): Promise<UserModel> {
        try {
            return await this.repository.find(params.id);
        } catch (e) {
            throw new BadRequestException({ message: transActions('fail') });
        }
    }

    @Delete('/me/:id')
    @UseGuards(new AuthGuard())
    public async deleteAccountMe(@Param() params) {
        try {
            return await this.repository.delete(params.id);
        } catch (e) {
            throw new BadRequestException({ message: transActions('fail') });
        }
    }
}
