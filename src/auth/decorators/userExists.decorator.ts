import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserExists = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userToUpdate;
  },
);
