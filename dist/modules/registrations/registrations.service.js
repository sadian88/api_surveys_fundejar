"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const registration_entity_1 = require("../../entities/registration.entity");
const attendee_entity_1 = require("../../entities/attendee.entity");
const survey_entity_1 = require("../../entities/survey.entity");
const survey_response_entity_1 = require("../../entities/survey-response.entity");
let RegistrationsService = class RegistrationsService {
    registrationRepository;
    attendeeRepository;
    surveyRepository;
    surveyResponseRepository;
    constructor(registrationRepository, attendeeRepository, surveyRepository, surveyResponseRepository) {
        this.registrationRepository = registrationRepository;
        this.attendeeRepository = attendeeRepository;
        this.surveyRepository = surveyRepository;
        this.surveyResponseRepository = surveyResponseRepository;
    }
    async create(payload) {
        await this.ensureUniqueDocument(payload.documentType, payload.documentNumber);
        const registration = this.registrationRepository.create(payload);
        return this.registrationRepository.save(registration);
    }
    findAll() {
        return this.registrationRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const registration = await this.registrationRepository.findOne({ where: { id } });
        if (!registration) {
            throw new common_1.NotFoundException(`Registration with ID ${id} not found`);
        }
        return registration;
    }
    async update(id, payload) {
        const registration = await this.findOne(id);
        const nextDocumentType = payload.documentType ?? registration.documentType;
        const nextDocumentNumber = payload.documentNumber ?? registration.documentNumber;
        await this.ensureUniqueDocument(nextDocumentType, nextDocumentNumber, registration.id);
        Object.assign(registration, payload);
        return this.registrationRepository.save(registration);
    }
    async remove(id) {
        const result = await this.registrationRepository.delete(id);
        if (!result.affected) {
            throw new common_1.NotFoundException(`Registration with ID ${id} not found`);
        }
        return { deleted: true };
    }
    async validateAccess(documentNumber, documentType) {
        if (!documentNumber) {
            return { registered: false, canContinue: false, reason: 'MISSING_DOCUMENT' };
        }
        const where = { documentNumber };
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
    async getProfile(documentNumber) {
        const registration = await this.registrationRepository.findOne({
            where: { documentNumber },
        });
        if (!registration) {
            throw new common_1.NotFoundException('Registration not found');
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
    async ensureUniqueDocument(documentType, documentNumber, ignoreId) {
        if (!documentType || !documentNumber) {
            return;
        }
        const existing = await this.registrationRepository.findOne({
            where: { documentType, documentNumber },
        });
        if (existing && existing.id !== ignoreId) {
            throw new common_1.ConflictException('Document already registered');
        }
    }
};
exports.RegistrationsService = RegistrationsService;
exports.RegistrationsService = RegistrationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(registration_entity_1.Registration)),
    __param(1, (0, typeorm_1.InjectRepository)(attendee_entity_1.Attendee)),
    __param(2, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __param(3, (0, typeorm_1.InjectRepository)(survey_response_entity_1.SurveyResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RegistrationsService);
//# sourceMappingURL=registrations.service.js.map