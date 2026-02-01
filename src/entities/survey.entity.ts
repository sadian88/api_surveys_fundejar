import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { SurveyResponse } from './survey-response.entity';

@Entity('surveys')
export class Survey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    title: string;

    @Column({ type: 'jsonb' })
    config: any;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => SurveyResponse, (response) => response.survey)
    responses: SurveyResponse[];
}
