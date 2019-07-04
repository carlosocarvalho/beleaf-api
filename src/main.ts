import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
const LIMIT = '50mb'
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    /*app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        //type: 'application/x-www-form-urlencoded',
        extended: true,
        limit: '50mb',
        parameterLimit: 1000000
    }))*/
    app.enableCors()
    app.setGlobalPrefix('api')
    await app.listen(86);
}
bootstrap();
