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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyResponse = void 0;
const typeorm_1 = require("typeorm");
const attendee_entity_1 = require("./attendee.entity");
const survey_entity_1 = require("./survey.entity");
let SurveyResponse = class SurveyResponse {
    id;
    attendee;
    attendeeId;
    survey;
    surveyId;
    answers;
    isCompleted;
    updatedAt;
};
exports.SurveyResponse = SurveyResponse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SurveyResponse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attendee_entity_1.Attendee, (attendee) => attendee.responses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'attendee_id' }),
    __metadata("design:type", attendee_entity_1.Attendee)
], SurveyResponse.prototype, "attendee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attendee_id' }),
    __metadata("design:type", Number)
], SurveyResponse.prototype, "attendeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => survey_entity_1.Survey, (survey) => survey.responses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'survey_id' }),
    __metadata("design:type", survey_entity_1.Survey)
], SurveyResponse.prototype, "survey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'survey_id' }),
    __metadata("design:type", Number)
], SurveyResponse.prototype, "surveyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], SurveyResponse.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_completed', default: false }),
    __metadata("design:type", Boolean)
], SurveyResponse.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SurveyResponse.prototype, "updatedAt", void 0);
exports.SurveyResponse = SurveyResponse = __decorate([
    (0, typeorm_1.Entity)('survey_responses'),
    (0, typeorm_1.Unique)(['attendee', 'survey'])
], SurveyResponse);
//# sourceMappingURL=survey-response.entity.js.map