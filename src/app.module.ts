import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Attendee } from './entities/attendee.entity';
import { CourseAttendance } from './entities/course-attendance.entity';
import { Course } from './entities/course.entity';
import { SurveyResponse } from './entities/survey-response.entity';
import { Survey } from './entities/survey.entity';
import { Admin } from './entities/admin.entity';
import { Registration } from './entities/registration.entity';
import { AttendeesModule } from './modules/attendees/attendees.module';
import { SurveysModule } from './modules/surveys/surveys.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { RegistrationsModule } from './modules/registrations/registrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Attendee, Survey, SurveyResponse, Course, CourseAttendance, Admin, Registration],
        synchronize: true, // During development, sync with DB. In prod, use migrations.
      }),
    }),
    AttendeesModule,
    SurveysModule,
    CoursesModule,
    AttendanceModule,
    AuthModule,
    DashboardModule,
    RegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
