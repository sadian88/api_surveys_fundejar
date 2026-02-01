import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    ) { }

    async create(data: Partial<Course>) {
        const course = this.courseRepository.create(data);
        return this.courseRepository.save(course);
    }

    async findAll() {
        return this.courseRepository.find({
            order: { courseDate: 'DESC' },
        });
    }

    async findOne(id: number) {
        return this.courseRepository.findOne({ where: { id } });
    }
}
