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
exports.SurveysController = void 0;
const common_1 = require("@nestjs/common");
const surveys_service_1 = require("./surveys.service");
const swagger_1 = require("@nestjs/swagger");
let SurveysController = class SurveysController {
    surveysService;
    constructor(surveysService) {
        this.surveysService = surveysService;
    }
    findAll() {
        return this.surveysService.findAll();
    }
    create(body) {
        return this.surveysService.create(body);
    }
    getActive() {
        return this.surveysService.getActiveSurvey();
    }
    savePartial(body) {
        if (!Number.isFinite(body.attendeeId) || !Number.isFinite(body.surveyId)) {
            throw new common_1.BadRequestException('Invalid attendeeId or surveyId');
        }
        return this.surveysService.savePartial(body.attendeeId, body.surveyId, body.questionId, body.value);
    }
    finalize(body) {
        if (!Number.isFinite(body.attendeeId) || !Number.isFinite(body.surveyId)) {
            throw new common_1.BadRequestException('Invalid attendeeId or surveyId');
        }
        return this.surveysService.finalize(body.attendeeId, body.surveyId);
    }
    getResponse(attendeeId, surveyId) {
        return this.surveysService.getResponse(attendeeId, surveyId);
    }
    listResponses(surveyId) {
        const parsedId = surveyId ? Number(surveyId) : undefined;
        if (surveyId && Number.isNaN(parsedId)) {
            return [];
        }
        return this.surveysService.listResponses(parsedId);
    }
    findOne(id) {
        return this.surveysService.findOne(id);
    }
    update(id, body) {
        return this.surveysService.update(id, body);
    }
    toggleStatus(id, body) {
        return this.surveysService.toggleStatus(id, body.isActive);
    }
    remove(id) {
        return this.surveysService.remove(id);
    }
};
exports.SurveysController = SurveysController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all surveys' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new survey' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('public/active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active survey (Public)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "getActive", null);
__decorate([
    (0, common_1.Post)('public/save-partial'),
    (0, swagger_1.ApiOperation)({ summary: 'Save partial response (Public)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "savePartial", null);
__decorate([
    (0, common_1.Post)('public/finalize'),
    (0, swagger_1.ApiOperation)({ summary: 'Finalize survey response (Public)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "finalize", null);
__decorate([
    (0, common_1.Get)('public/response'),
    (0, swagger_1.ApiOperation)({ summary: 'Get partial response (Public)' }),
    __param(0, (0, common_1.Query)('attendeeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('surveyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "getResponse", null);
__decorate([
    (0, common_1.Get)('responses'),
    (0, swagger_1.ApiOperation)({ summary: 'List survey responses (Admin)' }),
    __param(0, (0, common_1.Query)('surveyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "listResponses", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get survey by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update survey configuration' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle survey status' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete survey by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Survey deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SurveysController.prototype, "remove", null);
exports.SurveysController = SurveysController = __decorate([
    (0, swagger_1.ApiTags)('surveys'),
    (0, common_1.Controller)('admin/surveys'),
    __metadata("design:paramtypes", [surveys_service_1.SurveysService])
], SurveysController);
//# sourceMappingURL=surveys.controller.js.map