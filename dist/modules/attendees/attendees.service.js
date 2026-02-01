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
exports.AttendeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendee_entity_1 = require("../../entities/attendee.entity");
const survey_response_entity_1 = require("../../entities/survey-response.entity");
let AttendeesService = class AttendeesService {
    attendeeRepository;
    surveyResponseRepository;
    constructor(attendeeRepository, surveyResponseRepository) {
        this.attendeeRepository = attendeeRepository;
        this.surveyResponseRepository = surveyResponseRepository;
    }
    async verifyAttendee(documentNumber, fullName) {
        let attendee = await this.attendeeRepository.findOne({
            where: { documentNumber },
            relations: ['responses'],
        });
        if (!attendee) {
            attendee = this.attendeeRepository.create({
                documentNumber,
                fullName,
            });
            await this.attendeeRepository.save(attendee);
        }
        return attendee;
    }
    async findOne(id) {
        const attendee = await this.attendeeRepository.findOne({
            where: { id },
            relations: ['responses'],
        });
        if (!attendee) {
            throw new common_1.NotFoundException(`Attendee with ID ${id} not found`);
        }
        return attendee;
    }
    async linkNfc(documentNumber, nfcUid) {
        const attendee = await this.attendeeRepository.findOne({
            where: { documentNumber },
        });
        if (!attendee) {
            throw new common_1.NotFoundException(`Attendee with document ${documentNumber} not found`);
        }
        attendee.nfcUid = nfcUid;
        return this.attendeeRepository.save(attendee);
    }
    async updateProgress(id, progress, status) {
        const updateData = { surveyProgress: progress };
        if (status) {
            updateData.nfcStatus = status;
        }
        await this.attendeeRepository.update(id, updateData);
    }
    async findAll() {
        return this.attendeeRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
};
exports.AttendeesService = AttendeesService;
exports.AttendeesService = AttendeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendee_entity_1.Attendee)),
    __param(1, (0, typeorm_1.InjectRepository)(survey_response_entity_1.SurveyResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AttendeesService);
//# sourceMappingURL=attendees.service.js.map