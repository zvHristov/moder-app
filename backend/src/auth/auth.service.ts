import { 
    Injectable,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    
    ) {

    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
            // Check if user exists
      
        const userExists = await this.usersService.findOne(createUserDto._id);
        console.log(userExists, 'user ==> sinUp userExists')
        if (userExists) {
            throw new BadRequestException('User already exists');
        } 
        // create hash user

        const hash = await this.hashData(createUserDto.password);
       
            //create user if no exists
        const newUser: any = await this.usersService.create({
            ...createUserDto,
            password: hash, //just test
        });
    
        const tokens = await this.getTokens(newUser._id, newUser.name);
        await this.updateRefreshToken(newUser._id, tokens.refreshToken);
   
        const { name, email, createdAt, updatedAt, userId } = newUser;
        return {
          name, 
          email,
          userId, 
          createdAt, 
          updatedAt,
          ...tokens,
        };
    }
    
    async signIn(data: AuthDto) {
        // Check if user exists 
        //add interface now any
         
        const user: any = await this.usersService.findByEmail(data.email);
      
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(user.password, data.password);
       
        if (!passwordMatches)
          throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user._id, user.name);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        const { name, email, createdAt, updatedAt, userId, } = user;
        return {
          name, 
          email,
          userId, 
          createdAt, 
          updatedAt,
          ...tokens,
        };
    }
    
    async logout(userId: string) {
      return this.usersService.update(userId, { refreshToken: null });
    }
    
    hashData(data: string) {
        return argon2.hash(data);
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.findOne(userId);
        if (!user || !user.refreshToken)
          throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(
          user.refreshToken,
          refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user._id, user.name);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return tokens;  
    }
    
    async updateRefreshToken(_id: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(_id, {
          refreshToken: hashedRefreshToken,
        });
    }
    
    async getTokens(_id: string, name: string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: _id,
              name,
            },
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '15m',
            },
          ),
          this.jwtService.signAsync(
            {
              sub: _id,
              name,
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
    }
}
