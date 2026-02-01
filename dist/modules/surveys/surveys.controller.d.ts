import { SurveysService } from './surveys.service';
import { Survey } from '../../entities/survey.entity';
export declare class SurveysController {
    private readonly surveysService;
    constructor(surveysService: SurveysService);
    findAll(): Promise<Survey[]>;
    create(body: Partial<Survey>): Promise<Survey>;
    getActive(): Promise<Survey>;
    savePartial(body: {
        attendeeId: number;
        surveyId: number;
        questionId: string;
        value: any;
    }): Promise<{
        progress: number;
        isCompleted: boolean;
    }>;
    finalize(body: {
        attendeeId: number;
        surveyId: number;
    }): Promise<{
        success: boolean;
    }>;
    getResponse(attendeeId: number, surveyId: number): Promise<{
        answers: any;
        progress: number;
        isCompleted: boolean;
        updatedAt: Date | null;
    }>;
    listResponses(surveyId?: string): Promise<import("../../entities/survey-response.entity").SurveyResponse[]> | never[];
    findOne(id: number): Promise<Survey>;
    update(id: number, body: Partial<Survey>): Promise<Survey>;
    toggleStatus(id: number, body: {
        isActive: boolean;
    }): Promise<Survey>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
