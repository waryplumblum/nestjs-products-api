import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/products-nest-tutorial',
    {useNewUrlParser: true}), 
    CategoryModule,
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
