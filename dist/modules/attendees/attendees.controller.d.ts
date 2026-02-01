import { AttendeesService } from './attendees.service';
export declare class AttendeesController {
    private readonly attendeesService;
    constructor(attendeesService: AttendeesService);
    verify(body: {
        documentNumber: string;
        fullName: string;
    }): Promise<import("../../entities/attendee.entity").Attendee>;
    findOne(id: string): Promise<import("../../entities/attendee.entity").Attendee>;
    linkNfc(body: {
        documentNumber: string;
        nfcUid: string;
    }): Promise<import("../../entities/attendee.entity").Attendee>;
    findAll(): Promise<import("../../entities/attendee.entity").Attendee[]>;
}
