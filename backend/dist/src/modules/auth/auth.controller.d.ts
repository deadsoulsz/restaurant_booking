import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, loginDto: LoginDto): Promise<{
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
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    logout(user: any): Promise<void>;
    getMe(user: any): Promise<{
        data: any;
    }>;
}
