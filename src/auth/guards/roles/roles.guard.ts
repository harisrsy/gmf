import {
  CanActivate,
  Dependencies,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { User } from 'src/auth/models/user.class';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard {
  reflector: any;
  constructor(reflector: any) {
    this.reflector = reflector;
  }

  canActivate(context: {
    getHandler: () => any;
    getClass: () => any;
    switchToHttp: () => {
      (): any;
      new (): any;
      getRequest: {
        (): { user: any };
        new (): any;
      };
    };
  }) {
    const requiredRoles =
      this.reflector.getAllAndOverride(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context
      .switchToHttp()
      .getRequest();
    return requiredRoles.some((role: any) =>
      user.roles.includes(role),
    );
  }
}
