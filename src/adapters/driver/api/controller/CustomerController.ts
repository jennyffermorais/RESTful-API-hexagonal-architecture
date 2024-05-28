import { Body, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { ICustomerService } from '../../../../core/applications/ports/services/ICustomerService';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/CustomerDto';

@Route('customers')
@Tags('Customers')
export class CustomerController {
  private customerService: ICustomerService;

  constructor(customerService: ICustomerService) {
    this.customerService = customerService;
  }

  @Post('/')
  public async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const customer = await this.customerService.create(createCustomerDto);
      return customer;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Put('/{id}')
  public async update(
    @Path() id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const customer = await this.customerService.update(Number(id), updateCustomerDto);
      if (!customer) {
        return notFoundResponse(404, { message: 'Csutomer not found' });
      }
      return customer;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Delete('/{id}')
  public async delete(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const success = await this.customerService.delete(Number(id));
      if (!success) {
        return notFoundResponse(404, { message: 'Customer not found' });
      }
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/{id}')
  public async getById(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const customer = await this.customerService.getById(Number(id));
      if (!customer) {
        return notFoundResponse(404, { message: 'Customer not found' });
      }
      return customer;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/document/{documentNum}')
  public async getCustomerByDocument(
    @Path() documentNum: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const customer = await this.customerService.getCustomerByDocument(documentNum);
      if (!customer) {
        return notFoundResponse(404, { message: 'Customer not found' });
      }
      return customer;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/')
  public async getAll(
    @Query() documentNum: string,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const customers = await this.customerService.getAll({ documentNum });
      return customers;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }
}
