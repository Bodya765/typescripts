import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdSchema } from '../schemas/ad.schema';
import { UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL!), 
    MongooseModule.forFeature([
      { name: 'Ad', schema: AdSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
