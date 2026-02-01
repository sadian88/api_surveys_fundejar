import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post('log')
    log(@Body() body: { nfcUid: string; courseId: number }) {
        return this.attendanceService.logAttendance(body.nfcUid, body.courseId);
    }
}
