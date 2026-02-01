import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../../entities/admin.entity';
export declare class AuthService implements OnModuleInit {
    private adminRepository;
    private jwtService;
    constructor(adminRepository: Repository<Admin>, jwtService: JwtService);
    onModuleInit(): Promise<void>;
    private seedAdmin;
    login(username: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            role: string;
        };
    }>;
}
