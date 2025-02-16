import { Module } from '@nestjs/common';
import { AdModule } from './ad/ad.module'; 
import { DatabaseModule } from './schemas/database.module';


@Module({
  imports: [AdModule, DatabaseModule], 
  controllers: [],

})
export class AppModule {}