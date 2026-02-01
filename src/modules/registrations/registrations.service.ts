import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from '../../entities/registration.entity';
import { Attendee } from '../../entities/attendee.entity';
import { Survey } from '../../entities/survey.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';

@Injectable()
export class RegistrationsService {
    constructor(
        @InjectRepository(Registration)
        private registrationRepository: Repository<Registration>,
        @InjectRepository(Attendee)
        private attendeeRepository: Repository<Attendee>,
        @InjectRepository(Survey)
        private surveyRepository: Repository<Survey>,
        @InjectRepository(SurveyResponse)
        private surveyResponseRepository: Repository<SurveyResponse>,
    ) { }

    async create(payload: Partial<Registration>) {
        await this.ensureUniqueDocument(payload.documentType, payload.documentNumber);
        const registration = this.registrationRepository.create(payload);
        return this.registrationRepository.save(registration);
    }

    findAll() {
        return this.registrationRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number) {
        const registration = await this.registrationRepository.findOne({ where: { id } });
        if (!registration) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }
        return registration;
    }

    async update(id: number, payload: Partial<Registration>) {
        const registration = await this.findOne(id);
        const nextDocumentType = payload.documentType ?? registration.documentType;
        const nextDocumentNumber = payload.documentNumber ?? registration.documentNumber;
        await this.ensureUniqueDocument(nextDocumentType, nextDocumentNumber, registration.id);
        Object.assign(registration, payload);
        return this.registrationRepository.save(registration);
    }

    async remove(id: number) {
        const result = await this.registrationRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }
        return { deleted: true };
    }

    async validateAccess(documentNumber: string, documentType?: string) {
        if (!documentNumber) {
            return { registered: false, canContinue: false, reason: 'MISSING_DOCUMENT' };
        }

        const where: any = { documentNumber };
        if (documentType) {
            where.documentType = documentType;
        }

        const registration = await this.registrationRepository.findOne({ where });
        if (!registration) {
            return { registered: false, canContinue: false, reason: 'NOT_REGISTERED' };
        }

        const activeSurvey = await this.surveyRepository.findOne({
            where: { isActive: true },
        });
        if (!activeSurvey) {
            return { registered: true, canContinue: false, reason: 'NO_ACTIVE_SURVEY' };
        }

        let attendee = await this.attendeeRepository.findOne({
            where: { documentNumber },
        });

        if (!attendee) {
            attendee = this.attendeeRepository.create({
                documentNumber,
                fullName: `${registration.firstName} ${registration.lastName}`.trim(),
            });
            attendee = await this.attendeeRepository.save(attendee);
        }

        const response = await this.surveyResponseRepository.findOne({
            where: { attendeeId: attendee.id, surveyId: activeSurvey.id },
        });

        const pending = !response || !response.isCompleted;

        return {
            registered: true,
            canContinue: pending,
            attendeeId: attendee.id,
            surveyId: activeSurvey.id,
            reason: pending ? 'PENDING' : 'COMPLETED',
        };
    }

    async getProfile(documentNumber: string) {
        const registration = await this.registrationRepository.findOne({
            where: { documentNumber },
        });

        if (!registration) {
            throw new NotFoundException('Registration not found');
        }

        const attendee = await this.attendeeRepository.findOne({
            where: { documentNumber },
            relations: ['responses', 'responses.survey'],
        });

        return {
            registration,
            attendee: attendee || null,
            completedSurveys: attendee?.responses.filter(r => r.isCompleted) || [],
        };
    }

    private async ensureUniqueDocument(
        documentType?: Registration['documentType'],
        documentNumber?: string,
        ignoreId?: number,
    ) {
        if (!documentType || !documentNumber) {
            return;
        }

        const existing = await this.registrationRepository.findOne({
            where: { documentType, documentNumber },
        });

        if (existing && existing.id !== ignoreId) {
            throw new ConflictException('Document already registered');
        }
    }
}
