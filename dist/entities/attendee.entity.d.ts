import { SurveyResponse } from './survey-response.entity';
import { CourseAttendance } from './course-attendance.entity';
export declare enum NfcStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class Attendee {
    id: number;
    documentNumber: string;
    fullName: string;
    nfcUid: string;
    nfcStatus: NfcStatus;
    surveyProgress: number;
    createdAt: Date;
    responses: SurveyResponse[];
    attendances: CourseAttendance[];
}
