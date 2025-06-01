import { BookingStatus } from '@prisma/client';
export declare class QueryBookingsDto {
    page?: number;
    limit?: number;
    status?: BookingStatus;
}
