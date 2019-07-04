import {Module} from '@nestjs/common';

// ** APP IMPORT */
import {UserModule} from './user/user.module';
import {ProductModule} from './product/product.module';
import {DatabaseModule} from './database/database.module';

@Module({
    imports: [
        ProductModule, DatabaseModule, UserModule
    ],
    providers: []
})export class AppModule {}
