import {UserModel} from "./user.model";

export const UserProviders = [{
        provide: 'USER_REPOSITORY',
        useValue: UserModel
    }]
