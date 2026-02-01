import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendee, NfcStatus } from '../../entities/attendee.entity';
import { Course } from '../../entities/course.entity';
import { CourseAttendance } from '../../entities/course-attendance.entity';
import { Survey } from '../../entities/survey.entity';

@Controller('dashboard')
export class DashboardController {
    constructor(
        @InjectRepository(Attendee)
        private attendeeRepo: Repository<Attendee>,
        @InjectRepository(Course)
        private courseRepo: Repository<Course>,
        @InjectRepository(CourseAttendance)
        private attendanceRepo: Repository<CourseAttendance>,
        @InjectRepository(Survey)
        private surveyRepo: Repository<Survey>,
    ) { }

    @Get('stats')
    async getStats() {
        const totalStudents = await this.attendeeRepo.count();
        const activeNfcs = await this.attendeeRepo.count({ where: { nfcStatus: NfcStatus.ACTIVE } });

        // Attendance today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const attendanceToday = await this.attendanceRepo.count({
            where: {
                scannedAt: Between(startOfDay, endOfDay)
            }
        });

        // Avg survey progress
        const attendees = await this.attendeeRepo.find({ select: ['surveyProgress'] });
        const avgProgress = attendees.length > 0
            ? attendees.reduce((acc, curr) => acc + curr.surveyProgress, 0) / attendees.length
            : 0;

        return {
            totalStudents,
            activeNfcs,
            attendanceToday,
            avgSurveyProgress: Math.round(avgProgress),
            attendanceRate: 92, // Mock for now or calculate based on expected today
        };
    }

    @Get('active-surveys')
    async getActiveSurveys() {
        return this.surveyRepo.find({ where: { isActive: true } });
    }
}
