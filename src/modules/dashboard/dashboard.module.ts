import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { Attendee } from '../../entities/attendee.entity';
import { Course } from '../../entities/course.entity';
import { CourseAttendance } from '../../entities/course-attendance.entity';
import { Survey } from '../../entities/survey.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Attendee, Course, CourseAttendance, Survey])],
    controllers: [DashboardController],
})
export class DashboardModule { }
