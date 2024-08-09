import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { DriveKey } from 'src/historical-files/types';

export const DriveKeyParam = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): DriveKey => {
        const request = ctx.switchToHttp().getRequest();
        const driveKey = request.params.driveKey;

        if (!['R', 'V', 'T'].includes(driveKey)) {
            throw new BadRequestException(`Invalid driveKey: ${driveKey}. Valid keys are: R, V, T`);
        }

        return driveKey as DriveKey; 
    }
);