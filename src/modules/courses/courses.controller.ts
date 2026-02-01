import { Controller, Post, Get, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from '../../entities/course.entity';

@Controller('admin/courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Post()
    create(@Body() body: Partial<Course>) {
        return this.coursesService.create(body);
    }

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }
}
