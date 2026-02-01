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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendee_entity_1 = require("../../entities/attendee.entity");
const course_entity_1 = require("../../entities/course.entity");
const course_attendance_entity_1 = require("../../entities/course-attendance.entity");
const survey_entity_1 = require("../../entities/survey.entity");
let DashboardController = class DashboardController {
    attendeeRepo;
    courseRepo;
    attendanceRepo;
    surveyRepo;
    constructor(attendeeRepo, courseRepo, attendanceRepo, surveyRepo) {
        this.attendeeRepo = attendeeRepo;
        this.courseRepo = courseRepo;
        this.attendanceRepo = attendanceRepo;
        this.surveyRepo = surveyRepo;
    }
    async getStats() {
        const totalStudents = await this.attendeeRepo.count();
        const activeNfcs = await this.attendeeRepo.count({ where: { nfcStatus: attendee_entity_1.NfcStatus.ACTIVE } });
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const attendanceToday = await this.attendanceRepo.count({
            where: {
                scannedAt: (0, typeorm_2.Between)(startOfDay, endOfDay)
            }
        });
        const attendees = await this.attendeeRepo.find({ select: ['surveyProgress'] });
        const avgProgress = attendees.length > 0
            ? attendees.reduce((acc, curr) => acc + curr.surveyProgress, 0) / attendees.length
            : 0;
        return {
            totalStudents,
            activeNfcs,
            attendanceToday,
            avgSurveyProgress: Math.round(avgProgress),
            attendanceRate: 92,
        };
    }
    async getActiveSurveys() {
        return this.surveyRepo.find({ where: { isActive: true } });
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('active-surveys'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getActiveSurveys", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __param(0, (0, typeorm_1.InjectRepository)(attendee_entity_1.Attendee)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(course_attendance_entity_1.CourseAttendance)),
    __param(3, (0, typeorm_1.InjectRepository)(survey_entity_1.Survey)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map