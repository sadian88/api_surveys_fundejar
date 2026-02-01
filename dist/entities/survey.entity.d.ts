import { SurveyResponse } from './survey-response.entity';
export declare class Survey {
    id: number;
    title: string;
    config: any;
    isActive: boolean;
    createdAt: Date;
    responses: SurveyResponse[];
}
