import {ProductModel} from './product.model';
export const ProductProviders = [{
        provide: 'PRODUCT_REPOSITORY',
        useValue: ProductModel
    }]
