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
exports.CourseAttendance = void 0;
const typeorm_1 = require("typeorm");
const attendee_entity_1 = require("./attendee.entity");
const course_entity_1 = require("./course.entity");
let CourseAttendance = class CourseAttendance {
    id;
    course;
    courseId;
    attendee;
    attendeeId;
    scannedAt;
};
exports.CourseAttendance = CourseAttendance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseAttendance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.attendances, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    __metadata("design:type", course_entity_1.Course)
], CourseAttendance.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'course_id' }),
    __metadata("design:type", Number)
], CourseAttendance.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attendee_entity_1.Attendee, (attendee) => attendee.attendances, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'attendee_id' }),
    __metadata("design:type", attendee_entity_1.Attendee)
], CourseAttendance.prototype, "attendee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attendee_id' }),
    __metadata("design:type", Number)
], CourseAttendance.prototype, "attendeeId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'scanned_at' }),
    __metadata("design:type", Date)
], CourseAttendance.prototype, "scannedAt", void 0);
exports.CourseAttendance = CourseAttendance = __decorate([
    (0, typeorm_1.Entity)('course_attendance'),
    (0, typeorm_1.Unique)(['course', 'attendee'])
], CourseAttendance);
//# sourceMappingURL=course-attendance.entity.js.map