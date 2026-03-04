import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { AttendeesService } from './attendees.service';

@Controller('attendees')
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService) { }

    @Post('verify')
    verify(@Body() body: { documentNumber: string; fullName: string }) {
        return this.attendeesService.verifyAttendee(body.documentNumber, body.fullName);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attendeesService.findOne(+id);
    }

    @Patch('nfc-link')
    linkNfc(@Body() body: { documentNumber: string; nfcUid: string }) {
        return this.attendeesService.linkNfc(body.documentNumber, body.nfcUid);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: { fullName?: string; documentNumber?: string; nfcUid?: string; nfcStatus?: 'ACTIVE' | 'INACTIVE' }) {
        return this.attendeesService.update(+id, body);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.attendeesService.remove(+id);
    }

    @Get()
    findAll() {
        return this.attendeesService.findAll();
    }
}
