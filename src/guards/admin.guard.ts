import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestCustom, RoleType } from '../utils/definitions';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestCustom = context.switchToHttp().getRequest();
    if (request.user && request.user.role == RoleType.Admin) {
      return true;
    }
    return false;
  }
}
