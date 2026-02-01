import { Repository } from 'typeorm';
import { Attendee } from '../../entities/attendee.entity';
import { Course } from '../../entities/course.entity';
import { CourseAttendance } from '../../entities/course-attendance.entity';
import { Survey } from '../../entities/survey.entity';
export declare class DashboardController {
    private attendeeRepo;
    private courseRepo;
    private attendanceRepo;
    private surveyRepo;
    constructor(attendeeRepo: Repository<Attendee>, courseRepo: Repository<Course>, attendanceRepo: Repository<CourseAttendance>, surveyRepo: Repository<Survey>);
    getStats(): Promise<{
        totalStudents: number;
        activeNfcs: number;
        attendanceToday: number;
        avgSurveyProgress: number;
        attendanceRate: number;
    }>;
    getActiveSurveys(): Promise<Survey[]>;
}
