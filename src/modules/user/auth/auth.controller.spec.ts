import { TestBed } from '@automock/jest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { QueryRunner } from 'typeorm';

describe('AuthController', () => {
  let controller: AuthController;
  let service   : jest.Mocked<AuthService>;
  let qr        : jest.Mocked<QueryRunner>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(AuthController).compile();
    controller            = unit;
    service               = unitRef.get<AuthService>(AuthService);
    qr                    = {} as any as jest.Mocked<QueryRunner>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
