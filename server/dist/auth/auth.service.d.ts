import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EditProfileDto } from './dto/edit-profile.dto';
import { MarkerColor } from 'src/post/marker-color.enum';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    signup(authDto: AuthDto): Promise<void>;
    private getTokens;
    signin(authDto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private updateHashedRefreshToken;
    refreshToken(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile(user: User): {
        id: number;
        loginType: "email" | "kakao" | "apple";
        email: string;
        nickname?: string;
        imageUri?: string;
        kakaoImageUri?: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        post: import("../post/post.entity").Post[];
        favorites: import("../favorite/favorite.entity").Favorite[];
        RED: string;
        YELLOW: string;
        GREEN: string;
        BLUE: string;
        PURPLE: string;
    };
    editProfile(editProfileDto: EditProfileDto, user: User): Promise<void>;
    deleteRefreshToken(user: User): Promise<void>;
    deleteAccount(user: User): Promise<void>;
    updateCategory(categories: Record<keyof MarkerColor, string>, user: User): Promise<{
        id: number;
        loginType: "email" | "kakao" | "apple";
        email: string;
        nickname?: string;
        imageUri?: string;
        kakaoImageUri?: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        post: import("../post/post.entity").Post[];
        favorites: import("../favorite/favorite.entity").Favorite[];
        RED: string;
        YELLOW: string;
        GREEN: string;
        BLUE: string;
        PURPLE: string;
    }>;
    kakaoLogin(kakaoToken: {
        token: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    appleLogin(appleIdentity: {
        identityToken: string;
        appId: string;
        nickname: string | null;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
