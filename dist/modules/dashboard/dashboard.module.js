"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dashboard_controller_1 = require("./dashboard.controller");
const attendee_entity_1 = require("../../entities/attendee.entity");
const course_entity_1 = require("../../entities/course.entity");
const course_attendance_entity_1 = require("../../entities/course-attendance.entity");
const survey_entity_1 = require("../../entities/survey.entity");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attendee_entity_1.Attendee, course_entity_1.Course, course_attendance_entity_1.CourseAttendance, survey_entity_1.Survey])],
        controllers: [dashboard_controller_1.DashboardController],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map