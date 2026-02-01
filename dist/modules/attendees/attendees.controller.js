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
exports.AttendeesController = void 0;
const common_1 = require("@nestjs/common");
const attendees_service_1 = require("./attendees.service");
let AttendeesController = class AttendeesController {
    attendeesService;
    constructor(attendeesService) {
        this.attendeesService = attendeesService;
    }
    verify(body) {
        return this.attendeesService.verifyAttendee(body.documentNumber, body.fullName);
    }
    findOne(id) {
        return this.attendeesService.findOne(+id);
    }
    linkNfc(body) {
        return this.attendeesService.linkNfc(body.documentNumber, body.nfcUid);
    }
    findAll() {
        return this.attendeesService.findAll();
    }
};
exports.AttendeesController = AttendeesController;
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "verify", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('nfc-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "linkNfc", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "findAll", null);
exports.AttendeesController = AttendeesController = __decorate([
    (0, common_1.Controller)('attendees'),
    __metadata("design:paramtypes", [attendees_service_1.AttendeesService])
], AttendeesController);
//# sourceMappingURL=attendees.controller.js.map