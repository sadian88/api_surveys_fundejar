import { Attendee } from './attendee.entity';
import { Survey } from './survey.entity';
export declare class SurveyResponse {
    id: number;
    attendee: Attendee;
    attendeeId: number;
    survey: Survey;
    surveyId: number;
    answers: any;
    isCompleted: boolean;
    updatedAt: Date;
}
