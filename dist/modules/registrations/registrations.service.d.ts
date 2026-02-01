import { Repository } from 'typeorm';
import { Registration } from '../../entities/registration.entity';
import { Attendee } from '../../entities/attendee.entity';
import { Survey } from '../../entities/survey.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';
export declare class RegistrationsService {
    private registrationRepository;
    private attendeeRepository;
    private surveyRepository;
    private surveyResponseRepository;
    constructor(registrationRepository: Repository<Registration>, attendeeRepository: Repository<Attendee>, surveyRepository: Repository<Survey>, surveyResponseRepository: Repository<SurveyResponse>);
    create(payload: Partial<Registration>): Promise<Registration>;
    findAll(): Promise<Registration[]>;
    findOne(id: number): Promise<Registration>;
    update(id: number, payload: Partial<Registration>): Promise<Registration>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    validateAccess(documentNumber: string, documentType?: string): Promise<{
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
        attendee: Attendee | null;
        completedSurveys: SurveyResponse[];
    }>;
    private ensureUniqueDocument;
}
