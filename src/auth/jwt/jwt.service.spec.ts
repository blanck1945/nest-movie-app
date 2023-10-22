import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';

describe('JwtService', () => {
  let service: JwtTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtTokenService, JwtService],
    }).compile();

    service = module.get<JwtTokenService>(JwtTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
