import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: User): Promise<{
        data: {
            user: {
                id: string;
                email: string;
                name: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
            accessToken: string;
            refreshToken: string;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        data: {
            user: {
                id: string;
                email: string;
                name: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    logout(userId: string): Promise<void>;
}
