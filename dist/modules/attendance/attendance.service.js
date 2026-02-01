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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_attendance_entity_1 = require("../../entities/course-attendance.entity");
const attendee_entity_1 = require("../../entities/attendee.entity");
const course_entity_1 = require("../../entities/course.entity");
let AttendanceService = class AttendanceService {
    attendanceRepository;
    attendeeRepository;
    courseRepository;
    constructor(attendanceRepository, attendeeRepository, courseRepository) {
        this.attendanceRepository = attendanceRepository;
        this.attendeeRepository = attendeeRepository;
        this.courseRepository = courseRepository;
    }
    async logAttendance(nfcUid, courseId) {
        const attendee = await this.attendeeRepository.findOne({
            where: { nfcUid },
        });
        if (!attendee) {
            throw new common_1.NotFoundException('Attendee not found for this NFC');
        }
        if (attendee.nfcStatus !== attendee_entity_1.NfcStatus.ACTIVE) {
            throw new common_1.ForbiddenException('Encuesta incompleta, tarjeta inactiva');
        }
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const attendance = this.attendanceRepository.create({
            attendee,
            course,
        });
        return this.attendanceRepository.save(attendance);
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_attendance_entity_1.CourseAttendance)),
    __param(1, (0, typeorm_1.InjectRepository)(attendee_entity_1.Attendee)),
    __param(2, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map