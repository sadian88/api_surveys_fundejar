import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { CourseAttendance } from '../../entities/course-attendance.entity';
import { Attendee } from '../../entities/attendee.entity';
import { Course } from '../../entities/course.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CourseAttendance, Attendee, Course])],
    controllers: [AttendanceController],
    providers: [AttendanceService],
})
export class AttendanceModule { }
