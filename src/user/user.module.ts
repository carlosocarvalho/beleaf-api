import {UserProviders} from './user.provider';
import {UserController} from './user.controler';
import {Module} from '@nestjs/common';
import {UserService} from './user.service';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        ...UserProviders,
    ]
})
export class UserModule {}
