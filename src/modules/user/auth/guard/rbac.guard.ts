import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RBAC } from "../decorator/rbac.decorator";
import { Role } from "../entities/user.entity";

@Injectable()
export class RBACGuard implements CanActivate{
    constructor(
        private readonly reflector: Reflector,
    ){}

    canActivate(context: ExecutionContext): boolean{
        const role = this.reflector.get<Role>(RBAC, context.getHandler());

        // Role enum에 해당되는 값이 데코레이터에 들어갔는지 확인하기
        if(!Object.values(Role).includes(role)){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user    = request.user;

        if( !user ){
            throw new UnauthorizedException('토큰을 재발급 받으세요.');
        }

        if(user.role <= role){
            return true;
        } else {
            throw new UnauthorizedException('권한이 없는 요청입니다.');
        };
    }
}