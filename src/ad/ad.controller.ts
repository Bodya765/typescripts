import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AdService } from './ad.service';
import { Ad } from './ad.entity';

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Get()
  async getAllAds(): Promise<Ad[]> {
    return this.adService.getAllAds();
  }

  @Post()
  async createAd(@Body() ad: Ad): Promise<Ad> {
    return this.adService.createAd(ad);
  }

  @Put(':id')
  async updateAd(@Param('id') id: string, @Body() ad: Ad): Promise<Ad | null> { 
    return this.adService.updateAd(id, ad); 
  }

  @Delete(':id')
  async deleteAd(@Param('id') id: string): Promise<void> {
    return this.adService.deleteAd(id);
  }
}
