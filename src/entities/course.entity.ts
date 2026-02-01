import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseAttendance } from './course-attendance.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'course_date', type: 'timestamp' })
    courseDate: Date;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @OneToMany(() => CourseAttendance, (attendance) => attendance.course)
    attendances: CourseAttendance[];
}
