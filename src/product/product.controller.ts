/* eslint-disable prettier/prettier */
import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body,Param,NotFoundException, Query, /*Req*/} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product,
            
        });
    }







    @Get('/')
    async getProductsByCategory(@Res() res,@Query() query: any){

        //const nameCategory: any = query.categories;
        
        // if(!nameCategory){
        //     throw new NotFoundException('Producto no encontrado');
        // }

        const products = await this.productService.getProductsByCategory(query);

       
        return res.status(HttpStatus.OK).json(products)
    }








    @Get('/')
    async getProducts(@Res() res,@Query() query: any){
        const products = await this.productService.getProductsByCategory(query);
        return res.status(HttpStatus.OK).json(
            products
        )
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID);
        if(!product) throw new NotFoundException('Product Does not exists');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID){
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('Product Does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Succesfully',
            productDeleted
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID')productID){
        const updatedProduct = await this.productService.updateProduct(productID,createProductDTO);
        if(!updatedProduct) throw new NotFoundException('Product Does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct
        });
    }

}
