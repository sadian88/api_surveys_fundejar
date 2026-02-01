import { CoursesService } from './courses.service';
import { Course } from '../../entities/course.entity';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(body: Partial<Course>): Promise<Course>;
    findAll(): Promise<Course[]>;
}
