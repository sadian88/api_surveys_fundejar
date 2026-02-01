import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Registration } from '../../entities/registration.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('registrations')
@Controller('registrations')
export class RegistrationsController {
    constructor(private readonly registrationsService: RegistrationsService) { }

    @Get()
    @ApiOperation({ summary: 'List all registrations' })
    findAll() {
        return this.registrationsService.findAll();
    }

    @Get('validate')
    @ApiOperation({ summary: 'Validate access based on registration and pending survey' })
    validate(
        @Query('documentNumber') documentNumber: string,
        @Query('documentType') documentType?: string,
    ) {
        return this.registrationsService.validateAccess(documentNumber, documentType);
    }

    @Get('profile/:documentNumber')
    @ApiOperation({ summary: 'Get attendee full profile' })
    getProfile(@Param('documentNumber') documentNumber: string) {
        return this.registrationsService.getProfile(documentNumber);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new registration' })
    create(@Body() body: Partial<Registration>) {
        return this.registrationsService.create(body);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get registration by ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.registrationsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update registration' })
    update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Registration>) {
        return this.registrationsService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete registration' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.registrationsService.remove(id);
    }
}
