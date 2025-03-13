import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { envVariableKeys } from 'src/common/const/env.const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private readonly configService: ConfigService,
      private readonly jwtService: JwtService,
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, name, phone, company } = createUserDto;

    const user = await this.userRepository.findOne({
        where: {
            username
        }
    });
    if( user ){
        throw new BadRequestException('이미 가입한 회원입니다.');
    }

    const hash = await bcrypt.hash(password, this.configService.get<number>(envVariableKeys.HASH_ROUNDS, 10))

    await this.userRepository.save({
        username,
        password: hash,
        name, phone, company,
        lastLoginAt: new Date()
    });

    return await this.userRepository.findOne({
        where: {
          username
        }
    }) as User;
  }

  async login(LoginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { username, password } = LoginUserDto;
    
    const user = await this.authenticate(username, password);

    await this.userRepository.update(
      {id: user.id},
      {
        lastLoginAt: new Date()
      }
    );

    return { accessToken: await this.issueToken(user, false) }
  }

  async authenticate(username: string, password: string){
    const user = await this.userRepository.findOne({
      where: {
        username
      }
    });
    if( !user ){
        throw new BadRequestException('존재하지 않는 회원입니다.');
    }

    const passOk = await bcrypt.compare(password, user.password);
    if(!passOk){
        throw new BadRequestException('비밀번호가 잘못 되었습니다.');
    }

    return user;
  }

  async issueToken(user: User, isRefreshToken: boolean = false){
    const refreshTokenSecret = this.configService.get<string>(envVariableKeys.REFRESH_TOKEN_SECRET);
    const accressTokenSecret = this.configService.get<string>(envVariableKeys.ACCESS_TOKEN_SECRET);

    return await this.jwtService.signAsync({
        sub: user,
        role: Role.user,
        type: isRefreshToken ? 'refresh' : 'access'
    }, {
        secret: isRefreshToken ? refreshTokenSecret : accressTokenSecret,
        expiresIn: !isRefreshToken ? '24h' : 30000 // 300초 5분
    })
  }
}
