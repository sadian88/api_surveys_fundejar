import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        pass: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            role: string;
        };
    }>;
}
