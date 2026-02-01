"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const registration_entity_1 = require("../../entities/registration.entity");
const attendee_entity_1 = require("../../entities/attendee.entity");
const survey_entity_1 = require("../../entities/survey.entity");
const survey_response_entity_1 = require("../../entities/survey-response.entity");
const registrations_controller_1 = require("./registrations.controller");
const registrations_service_1 = require("./registrations.service");
let RegistrationsModule = class RegistrationsModule {
};
exports.RegistrationsModule = RegistrationsModule;
exports.RegistrationsModule = RegistrationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([registration_entity_1.Registration, attendee_entity_1.Attendee, survey_entity_1.Survey, survey_response_entity_1.SurveyResponse])],
        controllers: [registrations_controller_1.RegistrationsController],
        providers: [registrations_service_1.RegistrationsService],
    })
], RegistrationsModule);
//# sourceMappingURL=registrations.module.js.map