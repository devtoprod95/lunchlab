import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

const mockUserRepository = {
  findOne: jest.fn(),
  save   : jest.fn(),
  find   : jest.fn(),
  update : jest.fn(),
  delete : jest.fn()
}
const mockConfigService = {
  get: jest.fn()
}
const mockJwtService = {
  signAsync  : jest.fn(),
  verifyAsync: jest.fn(),
  decode     : jest.fn()
}

describe('AuthService', () => {
  let service       : AuthService;
  let userRepository: Repository<User>;
  let configService : ConfigService;
  let jwtService    : JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide : getRepositoryToken(User),
          useValue: mockUserRepository
        },
        {
          provide : ConfigService,
          useValue: mockConfigService
        },
        {
          provide : JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    service        = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    configService  = module.get<ConfigService>(ConfigService);
    jwtService     = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
