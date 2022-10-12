import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body,Param,NotFoundException, Query} from '@nestjs/common';
import { CreateCategoryDTO } from './dto/category.dto';

import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createCategoryDTO: CreateCategoryDTO){
        const category = await this.categoryService.createCategory(createCategoryDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Category Successfully Created',
            category
        });
    }

    @Get('/')
    async getCategories(@Res() res){
        const categories = await this.categoryService.getCategories();
        return res.status(HttpStatus.OK).json(
            categories
        )
    }

    @Get('/:categoryID')
    async getCategory(@Res() res, @Param('categoryID') categoryID){
        const category = await this.categoryService.getCategory(categoryID);
        if(!category) throw new NotFoundException('Category Does not exists');
        return res.status(HttpStatus.OK).json(category);
    }

    
    @Delete('/delete')
    async deleteCategory(@Res() res, @Query('categoryID') categoryID){
        const categoryDeleted = await this.categoryService.deleteCategory(categoryID);
        if (!categoryDeleted) throw new NotFoundException('Category Does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Category Deleted Succesfully',
            categoryDeleted
        });
    }

    @Put('/update')
    async updateCategory(@Res() res, @Body() createCategoryDTO: CreateCategoryDTO, @Query('categoryID')categoryID){
        const updatedCategory = await this.categoryService.updateCategory(categoryID,createCategoryDTO);
        if(!updatedCategory) throw new NotFoundException('Category Does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Category Updated Successfully',
            updatedCategory
        });
    }
}
