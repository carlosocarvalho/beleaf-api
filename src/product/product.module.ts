import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductProviders } from './product.provider';



@Module({
    controllers: [ProductController],
    providers: [
        ProductService,
        ...ProductProviders
    ]
})
export class ProductModule { }
