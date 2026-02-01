import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../../entities/survey.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';
import { AttendeesService } from '../attendees/attendees.service';

@Injectable()
export class SurveysService {
    constructor(
        @InjectRepository(Survey)
        private surveyRepository: Repository<Survey>,
        @InjectRepository(SurveyResponse)
        private surveyResponseRepository: Repository<SurveyResponse>,
        private attendeesService: AttendeesService,
    ) { }

    async getActiveSurvey() {
        const survey = await this.surveyRepository.findOne({
            where: { isActive: true },
        });

        if (!survey) {
            throw new NotFoundException('No active survey found');
        }

        return survey;
    }

    async savePartial(attendeeId: number, surveyId: number, questionId: string, value: any) {
        let response = await this.surveyResponseRepository.findOne({
            where: { attendeeId, surveyId },
        });

        if (!response) {
            response = this.surveyResponseRepository.create({
                attendeeId,
                surveyId,
                answers: {},
            });
        }

        response.answers[questionId] = value;

        const survey = await this.findOne(surveyId);
        const { progress, isCompleted } = this.calculateProgress(survey.config, response.answers);

        response.isCompleted = isCompleted;
        await this.surveyResponseRepository.save(response);

        await this.attendeesService.updateProgress(
            attendeeId,
            progress,
            isCompleted ? 'ACTIVE' : 'INACTIVE',
        );

        return { progress, isCompleted };
    }

    async getResponse(attendeeId: number, surveyId: number) {
        const response = await this.surveyResponseRepository.findOne({
            where: { attendeeId, surveyId },
        });

        const survey = await this.findOne(surveyId);
        const answers = response?.answers ?? {};
        const { progress, isCompleted } = this.calculateProgress(survey.config, answers);

        return {
            answers,
            progress,
            isCompleted,
            updatedAt: response?.updatedAt ?? null,
        };
    }

    async finalize(attendeeId: number, surveyId: number) {
        let response = await this.surveyResponseRepository.findOne({
            where: { attendeeId, surveyId },
        });

        if (!response) {
            // If they haven't answered anything but reached the end, create an empty response
            response = this.surveyResponseRepository.create({
                attendeeId,
                surveyId,
                answers: {},
            });
        }

        response.isCompleted = true;
        await this.surveyResponseRepository.save(response);

        // Ensure attendee is marked as having completed the survey (100% progress and 'ACTIVE' status)
        await this.attendeesService.updateProgress(
            attendeeId,
            100,
            'ACTIVE',
        );

        return { success: true };
    }

    listResponses(surveyId?: number) {
        const where = surveyId ? { surveyId } : {};
        return this.surveyResponseRepository.find({
            where,
            relations: ['attendee', 'survey'],
            order: { updatedAt: 'DESC' },
        });
    }

    async findAll() {
        return this.surveyRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number) {
        if (!Number.isFinite(id)) {
            throw new BadRequestException('Invalid survey id');
        }
        const survey = await this.surveyRepository.findOne({ where: { id } });
        if (!survey) throw new NotFoundException('Survey not found');
        return survey;
    }

    async create(data: Partial<Survey>) {
        const survey = this.surveyRepository.create({
            ...data,
            isActive: false, // Default to DRAFT
        });
        return this.surveyRepository.save(survey);
    }

    async update(id: number, data: Partial<Survey>) {
        const survey = await this.findOne(id);

        // Logical integrity check if config is being updated
        if (data.config) {
            this.validateConfig(data.config);
        }

        Object.assign(survey, data);
        return this.surveyRepository.save(survey);
    }

    async toggleStatus(id: number, isActive: boolean) {
        const survey = await this.findOne(id);

        if (isActive) {
            this.validateConfig(survey.config);
        }

        survey.isActive = isActive;
        return this.surveyRepository.save(survey);
    }

    async remove(id: number) {
        const result = await this.surveyRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException('Survey not found');
        }
        return { deleted: true };
    }

    private validateConfig(config: any) {
        if (!config || !config.sections) {
            throw new Error('Invalid survey structure: No sections found');
        }

        const allQuestionIds = new Set<string>();
        config.sections.forEach((section: any) => {
            section.questions?.forEach((q: any) => {
                if (allQuestionIds.has(q.id)) {
                    throw new Error(`Duplicate question ID found: ${q.id}`);
                }
                allQuestionIds.add(q.id);
            });
        });

        // Check dependencies
        config.sections.forEach((section: any) => {
            section.questions?.forEach((q: any) => {
                if (q.dependency) {
                    if (!allQuestionIds.has(q.dependency.parentQuestionId)) {
                        throw new Error(`Invalid dependency: Parent question ${q.dependency.parentQuestionId} not found for question ${q.id}`);
                    }
                    if (q.dependency.parentQuestionId === q.id) {
                        throw new Error(`Invalid dependency: Question ${q.id} cannot depend on itself`);
                    }
                }
            });
        });
    }

    private calculateProgress(config: any, answers: any) {
        // ... (rest of the existing logic but adapted for sections)
        const allQuestions: any[] = [];
        config.sections?.forEach((s: any) => {
            s.questions?.forEach((q: any) => allQuestions.push(q));
        });

        if (allQuestions.length === 0) return { progress: 100, isCompleted: true };

        let requiredCount = 0;
        let answeredCount = 0;

        allQuestions.forEach((q: any) => {
            let isVisible = true;
            if (q.dependency) {
                const depValue = answers[q.dependency.parentQuestionId];
                isVisible = depValue === q.dependency.triggerValue;
            }

            if (isVisible) {
                requiredCount++;
                if (answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '') {
                    answeredCount++;
                }
            }
        });

        const progress = requiredCount > 0 ? Math.round((answeredCount / requiredCount) * 100) : 100;
        const isCompleted = progress === 100;

        return { progress, isCompleted };
    }
}
