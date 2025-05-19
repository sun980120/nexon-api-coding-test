import { SetMetadata } from "@nestjs/common";

export const LogAction = (actionType: string) => SetMetadata('logAction', actionType);