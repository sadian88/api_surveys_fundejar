import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { Survey } from '../../entities/survey.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('surveys')
@Controller('admin/surveys')
export class SurveysController {
    constructor(private readonly surveysService: SurveysService) { }

    @Get()
    @ApiOperation({ summary: 'List all surveys' })
    findAll() {
        return this.surveysService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new survey' })
    create(@Body() body: Partial<Survey>) {
        return this.surveysService.create(body);
    }

    @Get('public/active')
    @ApiOperation({ summary: 'Get active survey (Public)' })
    getActive() {
        return this.surveysService.getActiveSurvey();
    }

    @Post('public/save-partial')
    @ApiOperation({ summary: 'Save partial response (Public)' })
    savePartial(
        @Body() body: { attendeeId: number; surveyId: number; questionId: string; value: any },
    ) {
        if (!Number.isFinite(body.attendeeId) || !Number.isFinite(body.surveyId)) {
            throw new BadRequestException('Invalid attendeeId or surveyId');
        }
        return this.surveysService.savePartial(
            body.attendeeId,
            body.surveyId,
            body.questionId,
            body.value,
        );
    }

    @Post('public/finalize')
    @ApiOperation({ summary: 'Finalize survey response (Public)' })
    finalize(@Body() body: { attendeeId: number; surveyId: number }) {
        if (!Number.isFinite(body.attendeeId) || !Number.isFinite(body.surveyId)) {
            throw new BadRequestException('Invalid attendeeId or surveyId');
        }
        return this.surveysService.finalize(body.attendeeId, body.surveyId);
    }

    @Get('public/response')
    @ApiOperation({ summary: 'Get partial response (Public)' })
    getResponse(
        @Query('attendeeId', ParseIntPipe) attendeeId: number,
        @Query('surveyId', ParseIntPipe) surveyId: number,
    ) {
        return this.surveysService.getResponse(attendeeId, surveyId);
    }

    @Get('responses')
    @ApiOperation({ summary: 'List survey responses (Admin)' })
    listResponses(@Query('surveyId') surveyId?: string) {
        const parsedId = surveyId ? Number(surveyId) : undefined;
        if (surveyId && Number.isNaN(parsedId)) {
            return [];
        }
        return this.surveysService.listResponses(parsedId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get survey by ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.surveysService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update survey configuration' })
    update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Survey>) {
        return this.surveysService.update(id, body);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Toggle survey status' })
    toggleStatus(@Param('id', ParseIntPipe) id: number, @Body() body: { isActive: boolean }) {
        return this.surveysService.toggleStatus(id, body.isActive);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete survey by ID' })
    @ApiResponse({ status: 200, description: 'Survey deleted' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.surveysService.remove(id);
    }
}
