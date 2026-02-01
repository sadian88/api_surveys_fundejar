import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { Attendee } from '../../entities/attendee.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Attendee, SurveyResponse])],
    controllers: [AttendeesController],
    providers: [AttendeesService],
    exports: [AttendeesService],
})
export class AttendeesModule { }
