import {HttpStatus} from '@nestjs/common';
import {HttpException} from '@nestjs/common';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context : ExecutionContext,): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        if (! request || ! request.headers.authorization) {
            return false
        }
        request.user = await this.validateToken(request.headers.authorization);
        return true;
    }


    async validateToken(auth : string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Token invalido', HttpStatus.UNAUTHORIZED)
        }

        const token = auth.split(' ')[1]
        try {
            const decoded: any = await jwt.verify(token, process.env.SECRET)
            return decoded
        } catch (e) {

            throw new HttpException({
                message: `Houve um problema com a requisicao ${
                    e.name
                }`
            }, HttpStatus.UNAUTHORIZED)
        }
    }
}
