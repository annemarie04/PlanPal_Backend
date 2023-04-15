import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class IdentityCheckGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;
    const authenticatedUserId = request.user.userId;

    if (userId !== authenticatedUserId) {
      throw new ForbiddenException('You are not authorized to view tasks for this user.');
    }

    return true;
  }
}
