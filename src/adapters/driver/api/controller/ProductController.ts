import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { IRepository } from '../../../../core/applications/ports/repositories/IRepository';
import { IProductService } from '../../../../core/applications/ports/services/IProductService';
import { IProduct } from '../../../../core/domain/Product';
import { ProductEntity } from '../../../../core/entities/Product';
import { ProductUseCase } from '../../../../core/usecases/Product';
import { ProductGateway } from '../../../gateway/Product';
import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';

@Route('products')
@Tags('Products')
export class ProductController extends Controller {
  private productDataSource: IRepository<ProductEntity>;
  private productService: IProductService;

  constructor(productService: IProductService) {
    super();
    this.productService = productService;
  }

  /**
   * Create a new product
   * @param createProductDto The product data to create
   */
  @Post()
  public async create(
    @Body() createProductDto: CreateProductDto,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<IProduct> {
    const productGateway = new ProductGateway(this.productDataSource);
    const useCase = new ProductUseCase(productGateway);
    try {
      return await useCase.create(createProductDto);
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  /**
   * Update an existing product by ID
   * @param id The ID of the product to update
   * @param updateProductDto The product data to update
   */
  @Put('{id}')
  public async update(
    @Path() id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<IProduct | null> {
    const productGateway = new ProductGateway(this.productDataSource);
    const useCase = new ProductUseCase(productGateway);

    try {
      return useCase.update(id, updateProductDto);
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  /**
   * Delete a product by ID
   * @param id The ID of the product to delete
   */
  @Delete('{id}')
  public async delete(
    @Path() id: number,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const productGateway = new ProductGateway(this.productDataSource);
    const useCase = new ProductUseCase(productGateway);
    try {
      const success = await useCase.delete(id);
      return success;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  /**
   * Get a product by ID
   * @param id The ID of the product to retrieve
   */
  @Get('{id}')
  public async getById(
    @Path() id: number,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<IProduct | null> {
    const productGateway = new ProductGateway(this.productDataSource);
    const useCase = new ProductUseCase(productGateway);

    try {
      return useCase.getById(id);
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  /**
   * Get all products, optionally filtered by category
   * @param category The category to filter products by
   */
  @Get()
  public async getAll(
    @Query() category: string,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<IProduct[]> {
    try {
      return this.productService.getAll({ category });
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }
}
