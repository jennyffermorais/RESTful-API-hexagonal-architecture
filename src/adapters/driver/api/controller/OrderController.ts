import { Body, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { IOrderService } from '../../../../core/applications/ports/services/IOrderService';
import { PROCESS_STATUS } from '../../../../core/domain/Order';
import { toOrder } from '../mapper/order.mapper';
import { CreateOrderDto, UpdateOrderDto } from './dto/OrderDto';
import { OrderEntity } from '../../../../core/entities/Order';
import { IRepository } from '../../../../core/applications/ports/repositories/IRepository';
import { OrderGateway } from '../../../gateway/Order';
import { OrderUseCase } from '../../../../core/usecases/Order';
import { OrderProductEntity } from '../../../../core/entities/OrderProduct';

@Route('orders')
@Tags('Order')
export class OrderController {
  private orderService: IOrderService;
  private orderDataSource: IRepository<OrderEntity>;
  private orderProductDataSource: IRepository<OrderProductEntity>;

  constructor(orderService: IOrderService) {
    this.orderService = orderService;
  }

  @Post('/')
  public async create(
    @Body() createOrderDto: CreateOrderDto,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const useCase = new OrderUseCase(orderGateway);
    try {
      const { order, products } = toOrder(createOrderDto);
      return await useCase.create(order, products);
    } catch (error) {
      console.log(error);
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Put('/{id}')
  public async update(
    @Path() id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const useCase = new OrderUseCase(orderGateway);
    try {
      const order = await useCase.update(Number(id), updateOrderDto);
      if (!order) {
        return notFoundResponse(404, { message: 'Order not found' });
      }
      return order;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Delete('/{id}')
  public async delete(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<void> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const useCase = new OrderUseCase(orderGateway);
    try {
      const success = await useCase.delete(Number(id));
      if (!success) {
        return notFoundResponse(404, { message: 'Order not found' });
      }
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/{id}')
  public async getOrderById(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const useCase = new OrderUseCase(orderGateway);
    try {
      const order = await useCase.getById(Number(id));
      if (!order) {
        return notFoundResponse(404, { message: 'Order not found' });
      }
      return order;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/')
  public async getAllOrders(
    @Query() processStage: PROCESS_STATUS,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const useCase = new OrderUseCase(orderGateway);
    try {
      const orders = await useCase.getAll({ processStage });
      return orders;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/status/{status}')
  public async getOrdersByStatus(
    @Path() status: string,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const useCase = new OrderUseCase(orderGateway);

    if (!useCase.isValidStatus(status)) {
      return badRequestResponse(400, { message: 'Invalid status' });
    }

    try {
      const orders = await useCase.getByStatus(status as PROCESS_STATUS);
      return orders;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/creation-date')
  public async getOrdersByCreationDate(
    @Query() startDate: string,
    @Query() endDate: string,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const useCase = new OrderUseCase(orderGateway);

    if (!startDate || !endDate) {
      return badRequestResponse(400, { message: 'Start date and end date are required' });
    }

    try {
      const orders = await useCase.getByCreationDate(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      return orders;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/update-date')
  public async getOrdersByUpdateDate(
    @Query() startDate: string,
    @Query() endDate: string,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const useCase = new OrderUseCase(orderGateway);

    if (!startDate || !endDate) {
      return badRequestResponse(400, { message: 'Start date and end date are required' });
    }

    try {
      const orders = await useCase.getByUpdateDate(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      return orders;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }
}
