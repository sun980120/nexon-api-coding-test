import { ConditionType } from "../schemas/event.schema";

export class RequestCreateEventDto {
    name: string;
    conditionType: ConditionType;
    conditionValue: number;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
}