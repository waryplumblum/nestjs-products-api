/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from './interfaces/category.interface';
import { CreateCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) { }

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async getCategoriesAggregate(): Promise<Category[]> {
    const categories = await this.categoryModel

      .aggregate([{
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categories",
          as: "class-category"
        }
      },
      {
        $match: {
          "class-category": { $ne: [] }
        }
      }
      ]);

    return categories;
  }


  async getCategory(categoryID: string): Promise<Category> {
    const category = await this.categoryModel.findById(categoryID);
    return category;
  }

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const category = new this.categoryModel(createCategoryDTO);
    return await category.save();
  }

  async deleteCategory(categoryID: string): Promise<Category> {
    const deleteCategory = await this.categoryModel.findByIdAndDelete(
      categoryID,
    );
    return deleteCategory;
  }

  async updateCategory(
    categoryID: string,
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const updateCategory = await this.categoryModel.findByIdAndUpdate(
      categoryID,
      createCategoryDTO,
      { new: true },
    );
    return updateCategory;
  }
}
