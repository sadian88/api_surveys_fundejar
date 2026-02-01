import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from '../../entities/registration.entity';
import { Attendee } from '../../entities/attendee.entity';
import { Survey } from '../../entities/survey.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';

@Module({
    imports: [TypeOrmModule.forFeature([Registration, Attendee, Survey, SurveyResponse])],
    controllers: [RegistrationsController],
    providers: [RegistrationsService],
})
export class RegistrationsModule { }
