import { RegistrationsService } from './registrations.service';
import { Registration } from '../../entities/registration.entity';
export declare class RegistrationsController {
    private readonly registrationsService;
    constructor(registrationsService: RegistrationsService);
    findAll(): Promise<Registration[]>;
    validate(documentNumber: string, documentType?: string): Promise<{
        registered: boolean;
        canContinue: boolean;
        reason: string;
        attendeeId?: undefined;
        surveyId?: undefined;
    } | {
        registered: boolean;
        canContinue: boolean;
        attendeeId: number;
        surveyId: number;
        reason: string;
    }>;
    getProfile(documentNumber: string): Promise<{
        registration: Registration;
        attendee: import("../../entities/attendee.entity").Attendee | null;
        completedSurveys: import("../../entities/survey-response.entity").SurveyResponse[];
    }>;
    create(body: Partial<Registration>): Promise<Registration>;
    findOne(id: number): Promise<Registration>;
    update(id: number, body: Partial<Registration>): Promise<Registration>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
