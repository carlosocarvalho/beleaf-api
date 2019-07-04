import { AuthGuard } from './../shared/auth.guard';
import { HandlerError } from '../helpers/handler-errors';

import {
    Get,
    Post,
    Controller,
    Body,
    Delete,
    Param,
    Response,
    BadRequestException,
    HttpException,
    Patch,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Res,
    Header,
    Req,
    ValidationPipe,
    Query

} from '@nestjs/common';

import { createReadStream } from 'fs';

import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ProductService } from './product.service';
import { ProductModel } from './product.model';
import { transActions } from '../helpers';
import * as multiparty from 'multiparty'
import { createWriteStream } from 'fs'

@Controller('/v1/products') export class ProductController {

    constructor(private readonly repository: ProductService) { }
    @Get('')
    public async index(
        @Query('page') page: number = 0,
        @Query('limit') limit: number = 10) {
        limit = limit > 5 ? 5 : limit;
        return await this.repository.paginate(
            {
                page,
                limit,
                route: 'http://localhost:86/api/v1/products',

            }, {
                order: [
                    ['createdAt', 'desc'],
                    ['title', 'asc']
                ]
            });
    }

    @Get(`/images/:bucket`)
    @Header(`content-type`, 'image/jpg')
    getFile(@Param() param, @Res() res, @Response() response) {
        res.sendFile(param.bucket, { root: `./uploads/products/` })
    }
    @Get('/:id')
    public async show(@Param() params): Promise<ProductModel> {
        try {
            return await this.repository.find(params.id);
        } catch (e) {
            throw new BadRequestException({ message: transActions('fail') });
        }
    }

    @Delete('/:id')
    @UseGuards(new AuthGuard())
    public async destroy(@Param() params, @Response() res) {
        try {
            const destroy = await this.repository.delete(params.id);


            return res.json({ message: destroy === 1 ? transActions('success.delete') : transActions('fail') })
        } catch (e) {
            throw new BadRequestException({ message: transActions('fail') });
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {

        storage: diskStorage({
            destination: './uploads/products',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async create(
        @UploadedFile() file,
        @Body() model: ProductModel,
        @Req() req,
        @Response() res) {

        try {
            if (!file) {
                return res.status(400).json({
                    errors: ['File is required'],
                    message: transActions('fail.create')
                })
            }
            const { filename } = file
            const created = await this.repository.create(model);
            const upd = { ...created, ... { image: filename } }
            await this.repository.update(created.id, upd)
            return res.json({ id: created.id, message: transActions('success.create') });
        } catch (e) {
            console.log(e)
            throw new BadRequestException({
                errors: new HandlerError(e.errors).getErrors(),
                message: transActions('fail.create')
            });
        }
    }




    @Patch('/:id')
    @UseGuards(new AuthGuard())
    public async update(@Param() params, @Body() model: ProductModel) {
        try {
            return await this.repository.update(params.id, model);
        } catch (e) {
            if (!e.errors) {
                throw new BadRequestException({
                    ...e,
                    ...{
                        message: transActions('fail')
                    }
                });
            }
            throw new BadRequestException({
                errors: new HandlerError(e.errors).getErrors(),
                message: transActions('fail')
            });
        }
    }
}