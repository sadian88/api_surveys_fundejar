import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { SurveyResponse } from './survey-response.entity';
import { CourseAttendance } from './course-attendance.entity';

export enum NfcStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

@Entity('attendees')
export class Attendee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'document_number', unique: true, length: 20 })
    documentNumber: string;

    @Column({ name: 'full_name', length: 150 })
    fullName: string;

    @Column({ name: 'nfc_uid', unique: true, length: 100, nullable: true })
    nfcUid: string;

    @Column({
        type: 'enum',
        enum: NfcStatus,
        default: NfcStatus.INACTIVE,
        name: 'nfc_status',
    })
    nfcStatus: NfcStatus;

    @Column({ name: 'survey_progress', default: 0 })
    surveyProgress: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => SurveyResponse, (response) => response.attendee)
    responses: SurveyResponse[];

    @OneToMany(() => CourseAttendance, (attendance) => attendance.attendee)
    attendances: CourseAttendance[];
}
