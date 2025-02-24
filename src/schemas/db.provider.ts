import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, Types } from 'mongoose';
import { Ad } from '../schemas/ad.schema'; 

@Injectable()
export class DbProvider {
  constructor(
    @InjectModel('Ad') private readonly adModel: Model<Ad & Document>,
  ) {}

  async getAllAds(): Promise<(Ad & Document)[]> {
    return this.adModel.find().exec(); 
  }

  async createAd(ad: Ad): Promise<Ad & Document> {
    const newAd = new this.adModel(ad);
    return newAd.save();
  }

  async updateAd(id: string, ad: Ad): Promise<Ad & Document | null> {

    return this.adModel.findByIdAndUpdate(id, ad, { new: true }).exec(); 
  }

  async deleteAd(id: string): Promise<Ad & Document | null> {
    return this.adModel.findByIdAndDelete(id).exec(); 
  }
}
