import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseAttendance } from '../../entities/course-attendance.entity';
import { Attendee, NfcStatus } from '../../entities/attendee.entity';
import { Course } from '../../entities/course.entity';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(CourseAttendance)
        private attendanceRepository: Repository<CourseAttendance>,
        @InjectRepository(Attendee)
        private attendeeRepository: Repository<Attendee>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    ) { }

    async logAttendance(nfcUid: string, courseId: number) {
        const attendee = await this.attendeeRepository.findOne({
            where: { nfcUid },
        });

        if (!attendee) {
            throw new NotFoundException('Attendee not found for this NFC');
        }

        if (attendee.nfcStatus !== NfcStatus.ACTIVE) {
            throw new ForbiddenException('Encuesta incompleta, tarjeta inactiva');
        }

        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const attendance = this.attendanceRepository.create({
            attendee,
            course,
        });

        return this.attendanceRepository.save(attendance);
    }
}
