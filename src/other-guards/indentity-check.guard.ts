import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class IdentityCheckGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId.toString();
    const authenticatedUserId = request.user.userId.toString();

    if (userId !== authenticatedUserId) {
      throw new ForbiddenException('You are not authorized to view activities this user.');
    }

    return true;
  }
}
