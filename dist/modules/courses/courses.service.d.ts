import { Repository } from 'typeorm';
import { Course } from '../../entities/course.entity';
export declare class CoursesService {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
    create(data: Partial<Course>): Promise<Course>;
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course | null>;
}
