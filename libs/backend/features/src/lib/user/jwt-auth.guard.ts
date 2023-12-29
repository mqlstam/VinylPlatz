import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add custom authentication logic here
    return super.canActivate(context);
  }

  override handleRequest(err: any, user: any, info: any, context: any, status: any) {
    // Custom error handling here
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
