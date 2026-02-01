import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Admin login' })
    @ApiResponse({ status: 200, description: 'Return JWT token' })
    login(@Body() body: { username: string; pass: string }) {
        return this.authService.login(body.username, body.pass);
    }
}
