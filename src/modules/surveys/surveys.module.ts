import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { Survey } from '../../entities/survey.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';
import { AttendeesModule } from '../attendees/attendees.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Survey, SurveyResponse]),
        AttendeesModule,
    ],
    controllers: [SurveysController],
    providers: [SurveysService],
})
export class SurveysModule { }
