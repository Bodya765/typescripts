import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad } from './ad.entity';

@Injectable()
export class AdService {
  constructor(
    @InjectModel(Ad.name) private adModel: Model<Ad>,
  ) {}

  async getAllAds(): Promise<Ad[]> {
    return this.adModel.find().exec();
  }

  async createAd(ad: Ad): Promise<Ad> {
    const newAd = new this.adModel(ad);
    return newAd.save();
  }

  async updateAd(id: string, ad: Ad): Promise<Ad | null> {
    return this.adModel.findByIdAndUpdate(id, ad, { new: true }).exec();
  }

  async deleteAd(id: string): Promise<void> {
    await this.adModel.findByIdAndDelete(id).exec();
  }
}
