import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendee } from '../../entities/attendee.entity';
import { SurveyResponse } from '../../entities/survey-response.entity';

@Injectable()
export class AttendeesService {
    constructor(
        @InjectRepository(Attendee)
        private attendeeRepository: Repository<Attendee>,
        @InjectRepository(SurveyResponse)
        private surveyResponseRepository: Repository<SurveyResponse>,
    ) { }

    async verifyAttendee(documentNumber: string, fullName: string) {
        let attendee = await this.attendeeRepository.findOne({
            where: { documentNumber },
            relations: ['responses'],
        });

        if (!attendee) {
            attendee = this.attendeeRepository.create({
                documentNumber,
                fullName,
            });
            await this.attendeeRepository.save(attendee);
        }

        return attendee;
    }

    async findOne(id: number) {
        const attendee = await this.attendeeRepository.findOne({
            where: { id },
            relations: ['responses'],
        });

        if (!attendee) {
            throw new NotFoundException(`Attendee with ID ${id} not found`);
        }

        return attendee;
    }

    async linkNfc(documentNumber: string, nfcUid: string) {
        const attendee = await this.attendeeRepository.findOne({
            where: { documentNumber },
        });

        if (!attendee) {
            throw new NotFoundException(`Attendee with document ${documentNumber} not found`);
        }

        attendee.nfcUid = nfcUid;
        return this.attendeeRepository.save(attendee);
    }

    async updateProgress(id: number, progress: number, status?: 'ACTIVE' | 'INACTIVE') {
        const updateData: any = { surveyProgress: progress };
        if (status) {
            updateData.nfcStatus = status;
        }
        await this.attendeeRepository.update(id, updateData);
    }

    async findAll() {
        return this.attendeeRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
}
