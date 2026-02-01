import { Repository } from 'typeorm';
import { CourseAttendance } from '../../entities/course-attendance.entity';
import { Attendee } from '../../entities/attendee.entity';
import { Course } from '../../entities/course.entity';
export declare class AttendanceService {
    private attendanceRepository;
    private attendeeRepository;
    private courseRepository;
    constructor(attendanceRepository: Repository<CourseAttendance>, attendeeRepository: Repository<Attendee>, courseRepository: Repository<Course>);
    logAttendance(nfcUid: string, courseId: number): Promise<CourseAttendance>;
}
