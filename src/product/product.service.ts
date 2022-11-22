/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
//import { CreateCategoryDTO } from 'src/category/dto/category.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) { }


  async getProductsByCategory(query:CreateProductDTO):Promise<Product[]>{
    
    const filters = [];

    filters.push(
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "category"
        }
      } 
    );

    if(query.categories && query.categories != 'null'){
      filters.push({
        $match:{
          $expr:{
            $eq:['$categories',{$toObjectId: query.categories}]
          }   
        }  
      })
    }

    

    console.log(query)
    const queryAggregate = await this.productModel.aggregate(filters)
    return queryAggregate;
  }





  
  async getProducts(): Promise<Product[]> {

    const products = await this.productModel

    //.find({"categories":'63460c4e0eb31b8eb014d153'})
      //.populate('categories', 'nameCategory');
      .aggregate([{

        $lookup: {
            from: "categories",
            localField: "categories",
            foreignField: "_id",
            as: "category"
        }},
        {
          $match:{
            "category":{$ne:[]}
          }  
        }/*,
        {
          $unwind: "$category"
        },*/
    ]);
    

    return products;
  }

  async getProduct(productID: string): Promise<Product> {
    const product = await this.productModel.findById(productID);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }

  async deleteProduct(productID: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }

  async updateProduct(
    productID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }
}
