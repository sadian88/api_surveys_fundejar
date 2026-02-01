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
exports.Survey = void 0;
const typeorm_1 = require("typeorm");
const survey_response_entity_1 = require("./survey-response.entity");
let Survey = class Survey {
    id;
    title;
    config;
    isActive;
    createdAt;
    responses;
};
exports.Survey = Survey;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Survey.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Survey.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], Survey.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Survey.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Survey.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => survey_response_entity_1.SurveyResponse, (response) => response.survey),
    __metadata("design:type", Array)
], Survey.prototype, "responses", void 0);
exports.Survey = Survey = __decorate([
    (0, typeorm_1.Entity)('surveys')
], Survey);
//# sourceMappingURL=survey.entity.js.map