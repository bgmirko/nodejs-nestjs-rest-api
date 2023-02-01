import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';
import { RequestCustom } from 'src/utils/definitions';

export const CurrentUser = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        console.log("--->", data);
        const request: RequestCustom = context.switchToHttp().getRequest();
        return request.user;
    }
)