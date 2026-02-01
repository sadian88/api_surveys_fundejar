import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Attendee } from './attendee.entity';
import { Survey } from './survey.entity';

@Entity('survey_responses')
@Unique(['attendee', 'survey'])
export class SurveyResponse {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Attendee, (attendee) => attendee.responses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'attendee_id' })
    attendee: Attendee;

    @Column({ name: 'attendee_id' })
    attendeeId: number;

    @ManyToOne(() => Survey, (survey) => survey.responses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'survey_id' })
    survey: Survey;

    @Column({ name: 'survey_id' })
    surveyId: number;

    @Column({ type: 'jsonb', default: {} })
    answers: any;

    @Column({ name: 'is_completed', default: false })
    isCompleted: boolean;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
