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
exports.Registration = exports.GenderType = exports.DocumentType = void 0;
const typeorm_1 = require("typeorm");
var DocumentType;
(function (DocumentType) {
    DocumentType["IDENTIDAD"] = "IDENTIDAD";
    DocumentType["CEDULA"] = "CEDULA";
    DocumentType["PASAPORTE"] = "PASAPORTE";
    DocumentType["PEP"] = "PEP";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var GenderType;
(function (GenderType) {
    GenderType["FEMENINO"] = "FEMENINO";
    GenderType["MASCULINO"] = "MASCULINO";
    GenderType["OTRO"] = "OTRO";
})(GenderType || (exports.GenderType = GenderType = {}));
let Registration = class Registration {
    id;
    firstName;
    middleName;
    lastName;
    nationality;
    birthDate;
    documentType;
    documentNumber;
    gender;
    age;
    address;
    phonePrimary;
    phoneSecondary;
    email;
    ventureName;
    createdAt;
    updatedAt;
};
exports.Registration = Registration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Registration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', length: 80 }),
    __metadata("design:type", String)
], Registration.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'middle_name', length: 80, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', length: 120 }),
    __metadata("design:type", String)
], Registration.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], Registration.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'birth_date', type: 'date' }),
    __metadata("design:type", String)
], Registration.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'document_type',
        type: 'enum',
        enum: DocumentType,
    }),
    __metadata("design:type", String)
], Registration.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_number', length: 30 }),
    __metadata("design:type", String)
], Registration.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GenderType,
        nullable: true,
    }),
    __metadata("design:type", String)
], Registration.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Registration.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 180, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_primary', length: 30 }),
    __metadata("design:type", String)
], Registration.prototype, "phonePrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_secondary', length: 30, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "phoneSecondary", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'venture_name', length: 120 }),
    __metadata("design:type", String)
], Registration.prototype, "ventureName", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Registration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Registration.prototype, "updatedAt", void 0);
exports.Registration = Registration = __decorate([
    (0, typeorm_1.Entity)('attendee_registrations'),
    (0, typeorm_1.Unique)(['documentType', 'documentNumber'])
], Registration);
//# sourceMappingURL=registration.entity.js.map