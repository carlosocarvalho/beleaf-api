import { FindManyOptions } from 'typeorm';
import { FindConditions } from 'typeorm';
import { ProductModel } from './product.model';
import { Injectable, Inject } from "@nestjs/common";
import { paginate } from '../helpers';

@Injectable() export class ProductService {
    constructor(@Inject('PRODUCT_REPOSITORY') private readonly PRODUCT_REPOSITORY: typeof ProductModel) { }


    async findAll(params?: object): Promise<ProductModel[]> {
        return await this.PRODUCT_REPOSITORY.findAll(params || {})
    }


    async paginate(options, searchOptions?: any) {
        return paginate<ProductModel>(this.PRODUCT_REPOSITORY, options, searchOptions)
    }

    async find(id: string): Promise<ProductModel> {
        return await this.PRODUCT_REPOSITORY.findOne(
            {
                where: {
                    id
                }
            }
        )
    }


    async update(id: string, data: any): Promise<any> { // this.PRODUCT_REPOSITORY.update(data);

        return await this.PRODUCT_REPOSITORY.update(data, {
            where: {
                id
            }
        });

    }

    async delete(id: string): Promise<number> {
        return this.PRODUCT_REPOSITORY.destroy(
            {
                where: {
                    id
                }
            }
        )
    }

    async create(data: ProductModel): Promise<any> {
        return await this.PRODUCT_REPOSITORY.create(data)
    }


}
