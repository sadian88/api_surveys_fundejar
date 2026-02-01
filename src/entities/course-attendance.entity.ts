import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Unique, Column } from 'typeorm';
import { Attendee } from './attendee.entity';
import { Course } from './course.entity';

@Entity('course_attendance')
@Unique(['course', 'attendee'])
export class CourseAttendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, (course) => course.attendances, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ name: 'course_id' })
    courseId: number;

    @ManyToOne(() => Attendee, (attendee) => attendee.attendances, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'attendee_id' })
    attendee: Attendee;

    @Column({ name: 'attendee_id' })
    attendeeId: number;

    @CreateDateColumn({ name: 'scanned_at' })
    scannedAt: Date;
}
