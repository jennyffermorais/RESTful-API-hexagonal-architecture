import { Body, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { ICustomerService } from '../../../../core/applications/ports/services/ICustomerService';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/CustomerDto';
import { CustomerGateway } from '../../../gateway/Customer';
import { CustomerUseCase } from '../../../../core/usecases/Customer';
import { CreateCustomerEntity } from '../../../../core/entities/CreateCustomer';
import { IRepository } from '../../../../core/applications/ports/repositories/IRepository';
import { CustomerEntity } from '../../../../core/entities/Customer';

@Route('customers')
@Tags('Customers')
export class CustomerController {
  private customerService: ICustomerService;
  private customerRepository: IRepository<CustomerEntity>;

  constructor(customerService: ICustomerService) {
    this.customerService = customerService;
  }

  @Post('/')
  public async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const customerGateway = new CustomerGateway(this.customerRepository);
    const useCase = new CustomerUseCase(customerGateway);
    try {
      const customer = useCase.create(createCustomerDto.name, createCustomerDto.documentNum, createCustomerDto.dateBirthday, createCustomerDto.email);
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
    const customerGateway = new CustomerGateway(this.customerRepository);
    const useCase = new CustomerUseCase(customerGateway);
    try {
      const customer = await useCase.update(Number(id), String(updateCustomerDto.name), String(updateCustomerDto.documentNum), String(updateCustomerDto.dateBirthday), String(updateCustomerDto.email));
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
    const customerGateway = new CustomerGateway(this.customerRepository);
    const useCase = new CustomerUseCase(customerGateway);
    try {
      const success = await useCase.delete(Number(id));
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
    const customerGateway = new CustomerGateway(this.customerRepository);
    const useCase = new CustomerUseCase(customerGateway);
    try {
      const customer = await useCase.getById(Number(id));
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
    const customerGateway = new CustomerGateway(this.customerRepository);
    const useCase = new CustomerUseCase(customerGateway);
    try {
      const customer = await useCase.getCustomerByDocument(documentNum);
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
    const customerGateway = new CustomerGateway(this.customerRepository);
    const useCase = new CustomerUseCase(customerGateway);
    try {
      const customers = await useCase.getAll({ documentNum });
      return customers;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }
}
