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
exports.Attendee = exports.NfcStatus = void 0;
const typeorm_1 = require("typeorm");
const survey_response_entity_1 = require("./survey-response.entity");
const course_attendance_entity_1 = require("./course-attendance.entity");
var NfcStatus;
(function (NfcStatus) {
    NfcStatus["ACTIVE"] = "ACTIVE";
    NfcStatus["INACTIVE"] = "INACTIVE";
})(NfcStatus || (exports.NfcStatus = NfcStatus = {}));
let Attendee = class Attendee {
    id;
    documentNumber;
    fullName;
    nfcUid;
    nfcStatus;
    surveyProgress;
    createdAt;
    responses;
    attendances;
};
exports.Attendee = Attendee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Attendee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_number', unique: true, length: 20 }),
    __metadata("design:type", String)
], Attendee.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', length: 150 }),
    __metadata("design:type", String)
], Attendee.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nfc_uid', unique: true, length: 100, nullable: true }),
    __metadata("design:type", String)
], Attendee.prototype, "nfcUid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: NfcStatus,
        default: NfcStatus.INACTIVE,
        name: 'nfc_status',
    }),
    __metadata("design:type", String)
], Attendee.prototype, "nfcStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'survey_progress', default: 0 }),
    __metadata("design:type", Number)
], Attendee.prototype, "surveyProgress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Attendee.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => survey_response_entity_1.SurveyResponse, (response) => response.attendee),
    __metadata("design:type", Array)
], Attendee.prototype, "responses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_attendance_entity_1.CourseAttendance, (attendance) => attendance.attendee),
    __metadata("design:type", Array)
], Attendee.prototype, "attendances", void 0);
exports.Attendee = Attendee = __decorate([
    (0, typeorm_1.Entity)('attendees')
], Attendee);
//# sourceMappingURL=attendee.entity.js.map