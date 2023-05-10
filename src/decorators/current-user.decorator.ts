import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestCustom } from '../utils/definitions';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request: RequestCustom = context.switchToHttp().getRequest();
    return request.user;
  },
);
