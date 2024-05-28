import { Body, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { Request, Response } from 'express';
import { IProductService } from '../../../../core/applications/ports/services/IProductService';
import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';

@Route('products')
@Tags('Products')
export class ProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  @Post('/')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>): Promise<any> {
    try {
      const product = await this.productService.create(createProductDto);
      return product;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Put('/{id}')
  async updateProduct(
    @Path() id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>): Promise<any> {

    try {
      const product = await this.productService.update(Number(id), updateProductDto);
      if (!product) {
        return notFoundResponse(404, { message: 'Product not found' });
      }
      return product;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Delete('/{id}')
  async deleteProduct(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>): Promise<any> {

    try {
      const success = await this.productService.delete(Number(id));
      if (!success) {
        return notFoundResponse(404, { message: 'Product not found' });
      }
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/{id}')
  async getProductById(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {

    try {
      const product = await this.productService.getById(Number(id));
      if (!product) {
        return notFoundResponse(404, { message: 'Product not found' });
      }
      return product;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/')
  async getAllProducts(
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const products = await this.productService.getAll();
      return products;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }
}
