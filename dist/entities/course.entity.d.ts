import { CourseAttendance } from './course-attendance.entity';
export declare class Course {
    id: number;
    name: string;
    description: string;
    courseDate: Date;
    isActive: boolean;
    attendances: CourseAttendance[];
}
