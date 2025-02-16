import { Test, TestingModule } from '@nestjs/testing';
import { AdService } from './ad.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad } from './ad.entity';

describe('AdService', () => {
  let service: AdService;
  let model: Model<Ad>;

  beforeEach(async () => {
    const mockAdModel = {
      find: jest.fn().mockResolvedValue([{ title: 'Ad 1', description: 'Test Ad', price: 100 }]),
      create: jest.fn().mockResolvedValue({ title: 'Ad 1', description: 'Test Ad', price: 100 }),
      findByIdAndUpdate: jest.fn().mockResolvedValue({ title: 'Updated Ad', description: 'Updated', price: 200 }),
      findByIdAndDelete: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdService,
        {
          provide: getModelToken(Ad.name),
          useValue: mockAdModel,
        },
      ],
    }).compile();

    service = module.get<AdService>(AdService);
    model = module.get<Model<Ad>>(getModelToken(Ad.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all ads', async () => {
    const result = await service.getAllAds();
    expect(result).toEqual([{ title: 'Ad 1', description: 'Test Ad', price: 100 }]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should create a new ad', async () => {
    const newAd = { title: 'Ad 1', description: 'Test Ad', price: 100 };
    const result = await service.createAd(newAd);
    expect(result).toEqual({ title: 'Ad 1', description: 'Test Ad', price: 100 });
    expect(model.create).toHaveBeenCalledWith(newAd);
  });

  it('should update an ad', async () => {
    const updateData = { title: 'Updated Ad', description: 'Updated', price: 200 };
    const result = await service.updateAd('1', updateData);
    expect(result).toEqual({ title: 'Updated Ad', description: 'Updated', price: 200 });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
  });

  it('should delete an ad', async () => {
    const result = await service.deleteAd('1');
    expect(result).toEqual({});
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
