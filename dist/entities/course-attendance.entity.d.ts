import { Attendee } from './attendee.entity';
import { Course } from './course.entity';
export declare class CourseAttendance {
    id: number;
    course: Course;
    courseId: number;
    attendee: Attendee;
    attendeeId: number;
    scannedAt: Date;
}
