import { Controller, Post, Route, Body, Get, Path, Put, Delete, Query, Tags } from 'tsoa';
import { IProductService } from '../../../../core/applications/ports/services/IProductService';
import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';
import { IProduct } from '../../../../core/domain/Product';

@Route('products')
@Tags('Products')
export class ProductController extends Controller {
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
  public async create(@Body() createProductDto: CreateProductDto): Promise<IProduct> {
    return this.productService.create(createProductDto);
  }

  /**
   * Update an existing product by ID
   * @param id The ID of the product to update
   * @param updateProductDto The product data to update
   */
  @Put('{id}')
  public async update(@Path() id: number, @Body() updateProductDto: UpdateProductDto): Promise<IProduct | null> {
    return this.productService.update(id, updateProductDto);
  }

  /**
   * Delete a product by ID
   * @param id The ID of the product to delete
   */
  @Delete('{id}')
  public async delete(@Path() id: number): Promise<void> {
    await this.productService.delete(id);
  }

  /**
   * Get a product by ID
   * @param id The ID of the product to retrieve
   */
  @Get('{id}')
  public async getById(@Path() id: number): Promise<IProduct | null> {
    return this.productService.getById(id);
  }

  /**
   * Get all products, optionally filtered by category
   * @param category The category to filter products by
   */
  @Get()
  public async getAll(@Query() category?: string): Promise<IProduct[]> {
    return this.productService.getAll({ category });
  }
}
