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
exports.RegistrationsController = void 0;
const common_1 = require("@nestjs/common");
const registrations_service_1 = require("./registrations.service");
const swagger_1 = require("@nestjs/swagger");
let RegistrationsController = class RegistrationsController {
    registrationsService;
    constructor(registrationsService) {
        this.registrationsService = registrationsService;
    }
    findAll() {
        return this.registrationsService.findAll();
    }
    validate(documentNumber, documentType) {
        return this.registrationsService.validateAccess(documentNumber, documentType);
    }
    getProfile(documentNumber) {
        return this.registrationsService.getProfile(documentNumber);
    }
    create(body) {
        return this.registrationsService.create(body);
    }
    findOne(id) {
        return this.registrationsService.findOne(id);
    }
    update(id, body) {
        return this.registrationsService.update(id, body);
    }
    remove(id) {
        return this.registrationsService.remove(id);
    }
};
exports.RegistrationsController = RegistrationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all registrations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('validate'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate access based on registration and pending survey' }),
    __param(0, (0, common_1.Query)('documentNumber')),
    __param(1, (0, common_1.Query)('documentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "validate", null);
__decorate([
    (0, common_1.Get)('profile/:documentNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendee full profile' }),
    __param(0, (0, common_1.Param)('documentNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new registration' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get registration by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update registration' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete registration' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "remove", null);
exports.RegistrationsController = RegistrationsController = __decorate([
    (0, swagger_1.ApiTags)('registrations'),
    (0, common_1.Controller)('registrations'),
    __metadata("design:paramtypes", [registrations_service_1.RegistrationsService])
], RegistrationsController);
//# sourceMappingURL=registrations.controller.js.map