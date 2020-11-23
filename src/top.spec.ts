import { Test, TestingModule } from '@nestjs/testing';
import { Top } from './top';

describe('Top', () => {
  let provider: Top;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Top],
    }).compile();

    provider = module.get<Top>(Top);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
