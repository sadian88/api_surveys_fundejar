import { Repository } from 'typeorm';
import { Attendee } from '../../entities/attendee.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';
export declare class AttendeesService {
    private attendeeRepository;
    private surveyResponseRepository;
    constructor(attendeeRepository: Repository<Attendee>, surveyResponseRepository: Repository<SurveyResponse>);
    verifyAttendee(documentNumber: string, fullName: string): Promise<Attendee>;
    findOne(id: number): Promise<Attendee>;
    linkNfc(documentNumber: string, nfcUid: string): Promise<Attendee>;
    updateProgress(id: number, progress: number, status?: 'ACTIVE' | 'INACTIVE'): Promise<void>;
    findAll(): Promise<Attendee[]>;
}
