/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role-decorators';
import { Configs } from '../config/config';
import { HttpError } from '../errors/custom.errors';

export enum Role {
  PLATFORM_USER = 'platform_user',
  PUBLIC = 'public',
  ADMIN = 'admin',
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  private readonly logger = new Logger(RolesGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    return await this.checkRoleBasedAuthorization(requiredRoles, request);
  }

  checkRoleBasedAuthorization = async (
    roles: Role[],
    request: any,
  ): Promise<boolean> => {
    const auth_token =
      request.headers['Authorization'] ||
      request.headers['authorization'] ||
      request.headers['x-api-key'] ||
      request.headers['x-access-token'];
    const userRole = roles[0];
    let token;

    switch (userRole) {
      case Role.PUBLIC:
        return true;
      case Role.PLATFORM_USER:
        return true;
      case Role.ADMIN:
        if (!auth_token) {
          throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
        }
        token = auth_token.replace('Bearer ', '');

        if (!Configs().scheduler_admin_secret_key) {
          throw HttpError(
            HttpStatus.UNAUTHORIZED,
            'environment config errors!',
          );
        }
        return Configs().scheduler_admin_secret_key?.toString() === token;
      default:
        return false;
    }
  };
}
