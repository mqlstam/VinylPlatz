import { Test, TestingModule } from '@nestjs/testing';
import { AlbumRecommendationService } from './album-recommendation.service';

describe('AlbumRecommendationService', () => {
  let service: AlbumRecommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumRecommendationService],
    }).compile();

    service = module.get<AlbumRecommendationService>(
      AlbumRecommendationService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
