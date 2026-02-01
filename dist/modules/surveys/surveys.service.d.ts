import { Repository } from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';
import { AttendeesService } from '../attendees/attendees.service';
export declare class SurveysService {
    private surveyRepository;
    private surveyResponseRepository;
    private attendeesService;
    constructor(surveyRepository: Repository<Survey>, surveyResponseRepository: Repository<SurveyResponse>, attendeesService: AttendeesService);
    getActiveSurvey(): Promise<Survey>;
    savePartial(attendeeId: number, surveyId: number, questionId: string, value: any): Promise<{
        progress: number;
        isCompleted: boolean;
    }>;
    getResponse(attendeeId: number, surveyId: number): Promise<{
        answers: any;
        progress: number;
        isCompleted: boolean;
        updatedAt: Date | null;
    }>;
    finalize(attendeeId: number, surveyId: number): Promise<{
        success: boolean;
    }>;
    listResponses(surveyId?: number): Promise<SurveyResponse[]>;
    findAll(): Promise<Survey[]>;
    findOne(id: number): Promise<Survey>;
    create(data: Partial<Survey>): Promise<Survey>;
    update(id: number, data: Partial<Survey>): Promise<Survey>;
    toggleStatus(id: number, isActive: boolean): Promise<Survey>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    private validateConfig;
    private calculateProgress;
}
