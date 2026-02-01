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
exports.SurveysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const survey_entity_1 = require("../../entities/survey.entity");
const survey_response_entity_1 = require("../../entities/survey-response.entity");
const attendees_service_1 = require("../attendees/attendees.service");
let SurveysService = class SurveysService {
    surveyRepository;
    surveyResponseRepository;
    attendeesService;
    constructor(surveyRepository, surveyResponseRepository, attendeesService) {
        this.surveyRepository = surveyRepository;
        this.surveyResponseRepository = surveyResponseRepository;
        this.attendeesService = attendeesService;
    }
    async getActiveSurvey() {
        const survey = await this.surveyRepository.findOne({
            where: { isActive: true },
        });
        if (!survey) {
            throw new common_1.NotFoundException('No active survey found');
        }
        return survey;
    }
    async savePartial(attendeeId, surveyId, questionId, value) {
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
        await this.attendeesService.updateProgress(attendeeId, progress, isCompleted ? 'ACTIVE' : 'INACTIVE');
        return { progress, isCompleted };
    }
    async getResponse(attendeeId, surveyId) {
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
    async finalize(attendeeId, surveyId) {
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
        response.isCompleted = true;
        await this.surveyResponseRepository.save(response);
        await this.attendeesService.updateProgress(attendeeId, 100, 'ACTIVE');
        return { success: true };
    }
    listResponses(surveyId) {
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
    async findOne(id) {
        if (!Number.isFinite(id)) {
            throw new common_1.BadRequestException('Invalid survey id');
        }
        const survey = await this.surveyRepository.findOne({ where: { id } });
        if (!survey)
            throw new common_1.NotFoundException('Survey not found');
        return survey;
    }
    async create(data) {
        const survey = this.surveyRepository.create({
            ...data,
            isActive: false,
        });
        return this.surveyRepository.save(survey);
    }
    async update(id, data) {
        const survey = await this.findOne(id);
        if (data.config) {
            this.validateConfig(data.config);
        }
        Object.assign(survey, data);
        return this.surveyRepository.save(survey);
    }
    async toggleStatus(id, isActive) {
        const survey = await this.findOne(id);
        if (isActive) {
            this.validateConfig(survey.config);
        }
        survey.isActive = isActive;
        return this.surveyRepository.save(survey);
    }
    async remove(id) {
        const result = await this.surveyRepository.delete(id);
        if (!result.affected) {
            throw new common_1.NotFoundException('Survey not found');
        }
        return { deleted: true };
    }
    validateConfig(config) {
        if (!config || !config.sections) {
            throw new Error('Invalid survey structure: No sections found');
        }
        const allQuestionIds = new Set();
        config.sections.forEach((section) => {
            section.questions?.forEach((q) => {
                if (allQuestionIds.has(q.id)) {
                    throw new Error(`Duplicate question ID found: ${q.id}`);
                }
                allQuestionIds.add(q.id);
            });
        });
        config.sections.forEach((section) => {
            section.questions?.forEach((q) => {
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
    calculateProgress(config, answers) {
        const allQuestions = [];
        config.sections?.forEach((s) => {
            s.questions?.forEach((q) => allQuestions.push(q));
        });
        if (allQuestions.length === 0)
            return { progress: 100, isCompleted: true };
        let requiredCount = 0;
        let answeredCount = 0;
        allQuestions.forEach((q) => {
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
};
exports.SurveysService = SurveysService;
exports.SurveysService = SurveysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __param(1, (0, typeorm_1.InjectRepository)(survey_response_entity_1.SurveyResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        attendees_service_1.AttendeesService])
], SurveysService);
//# sourceMappingURL=surveys.service.js.map