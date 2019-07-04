import {
    Table,
    Model,
    Column,
    DataType,
    BeforeCreate,
    IsUUID,
    PrimaryKey,
    AllowNull,
    IsNull
} from "sequelize-typescript";
import * as uuid from 'uuid/v4';
import { fixPrice } from "../helpers";


function applyDiscount(discount: number, price: number): string {
    return String(discount > 0 ? price - ((price * discount) / 100) : 0)
}

@Table({ timestamps: true, tableName: 'products', modelName: 'produto' })
export class ProductModel extends Model<ProductModel> {

    @IsUUID(4)
    @PrimaryKey @Column({ type: DataType.UUIDV4, primaryKey: true })
    id: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    title: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    description: string;

    @Column({ type: DataType.NUMBER })
    discount: number;

    @AllowNull(false)
    @Column({ type: DataType.DECIMAL })
    price: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    stuff: string;

    @AllowNull(true)
    @Column({ type: DataType.STRING })
    image: string;

    @AllowNull(false)
    @Column({ type: DataType.NUMBER })
    stock: number;


    @BeforeCreate static async createUUID(instance: ProductModel) {
        instance.id = await uuid();
    }

    public static toResponse(data) {
        let { id, title, description, discount, stock, image, stuff, price } = data
        const calculateDiscount = applyDiscount(discount, price)
        const withDiscount = fixPrice(calculateDiscount)
        const discountFormated = `${discount}%`

        return { id, title, description, stock, image, stuff, price, discount, discountFormated, withDiscount }
    }



}

