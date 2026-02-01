import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from '../../entities/admin.entity';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        private jwtService: JwtService,
    ) { }

    async onModuleInit() {
        await this.seedAdmin();
    }

    private async seedAdmin() {
        const adminCount = await this.adminRepository.count();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            const admin = this.adminRepository.create({
                username: 'admin',
                passwordHash: hashedPassword,
                role: 'ADMIN',
            });
            await this.adminRepository.save(admin);
            console.log('Seeded initial admin user: admin / admin');
        }
    }

    async login(username: string, pass: string) {
        const admin = await this.adminRepository.findOne({
            where: { username },
        });

        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(pass, admin.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: admin.username, sub: admin.id, role: admin.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: admin.id,
                username: admin.username,
                role: admin.role,
            },
        };
    }
}
