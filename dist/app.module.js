"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const attendee_entity_1 = require("./entities/attendee.entity");
const course_attendance_entity_1 = require("./entities/course-attendance.entity");
const course_entity_1 = require("./entities/course.entity");
const survey_response_entity_1 = require("./entities/survey-response.entity");
const survey_entity_1 = require("./entities/survey.entity");
const admin_entity_1 = require("./entities/admin.entity");
const registration_entity_1 = require("./entities/registration.entity");
const attendees_module_1 = require("./modules/attendees/attendees.module");
const surveys_module_1 = require("./modules/surveys/surveys.module");
const courses_module_1 = require("./modules/courses/courses.module");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const auth_module_1 = require("./modules/auth/auth.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const registrations_module_1 = require("./modules/registrations/registrations.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [attendee_entity_1.Attendee, survey_entity_1.Survey, survey_response_entity_1.SurveyResponse, course_entity_1.Course, course_attendance_entity_1.CourseAttendance, admin_entity_1.Admin, registration_entity_1.Registration],
                    synchronize: true,
                }),
            }),
            attendees_module_1.AttendeesModule,
            surveys_module_1.SurveysModule,
            courses_module_1.CoursesModule,
            attendance_module_1.AttendanceModule,
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            registrations_module_1.RegistrationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map