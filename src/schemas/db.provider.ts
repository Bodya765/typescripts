import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad } from '../ad/ad.entity';  // Імпортуємо модель Ad

@Injectable()
export class DbProvider {
  constructor(
    @InjectModel(Ad.name) private readonly adModel: Model<Ad>,  // Використовуємо правильну модель
  ) {}

  async getAllAds(): Promise<Ad[]> {
    return this.adModel.find().exec();
  }

  async createAd(ad: Ad): Promise<Ad> {
    const newAd = new this.adModel(ad);
    return newAd.save();
  }

  async updateAd(id: string, ad: Ad): Promise<Ad> {
    return this.adModel.findByIdAndUpdate(id, ad, { new: true }).exec();
  }

  async deleteAd(id: string): Promise<Ad> {
    return this.adModel.findByIdAndDelete(id).exec();
  }
}
