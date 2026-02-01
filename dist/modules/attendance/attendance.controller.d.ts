import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    log(body: {
        nfcUid: string;
        courseId: number;
    }): Promise<import("../../entities/course-attendance.entity").CourseAttendance>;
}
