import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<User>);
    validate(payload: {
        email: string;
    }): Promise<User>;
}
export {};
