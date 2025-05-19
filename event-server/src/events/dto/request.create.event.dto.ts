export class RequestCreateEventDto {
    name: string;
    condition: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
}