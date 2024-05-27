import { Request, Response } from 'express';
import { IOrderService } from '../../../../core/applications/ports/IOrderService';
import { PROCESS_STATUS } from '../../../../core/domain/Order';
import { OrderService } from '../../../../core/applications/services/OrderService';
import { CreateOrderDto, UpdateOrderDto } from './dto/OrderDto';
import { Delete, Get, Post, Put, Route, Tags, Body, Path, Query, Res, TsoaResponse } from 'tsoa';

@Route("orders")
@Tags("Order")
export class OrderController {
  private orderService: IOrderService;

  constructor(orderService: IOrderService) {
    this.orderService = orderService;
  }

  @Post("/")
  public async create(
    @Body() createOrderDto: CreateOrderDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const order = await this.orderService.create(createOrderDto);
      return order;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Put("/{id}")
  public async update(
    @Path() id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const order = await this.orderService.update(Number(id), updateOrderDto);
      if (!order) {
        return notFoundResponse(404, { message: 'Order not found' });
      }
      return order;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Delete("/{id}")
  public async delete(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<void> {
    try {
      const success = await this.orderService.delete(Number(id));
      if (!success) {
        return notFoundResponse(404, { message: 'Order not found' });
      }
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get("/{id}")
  public async getOrderById(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const order = await this.orderService.getById(Number(id));
      if (!order) {
        return notFoundResponse(404, { message: 'Order not found' });
      }
      return order;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get("/")
  public async getAllOrders(
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const orders = await this.orderService.getAllOrders();
      return orders;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get("/status/{status}")
  public async getOrdersByStatus(
    @Path() status: string,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    if (!this.orderService.isValidStatus(status)) {
      return badRequestResponse(400, { message: 'Invalid status' });
    }

    try {
      const orders = await this.orderService.getOrdersByStatus(status as PROCESS_STATUS);
      return orders;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get("/creation-date")
  public async getOrdersByCreationDate(
    @Query() startDate: string,
    @Query() endDate: string,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    if (!startDate || !endDate) {
      return badRequestResponse(400, { message: 'Start date and end date are required' });
    }

    try {
      const orders = await this.orderService.getOrdersByCreationDate(
        new Date(startDate),
        new Date(endDate)
      );
      return orders;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get("/update-date")
  public async getOrdersByUpdateDate(
    @Query() startDate: string,
    @Query() endDate: string,
    @Res() badRequestResponse: TsoaResponse<400, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    if (!startDate || !endDate) {
      return badRequestResponse(400, { message: 'Start date and end date are required' });
    }

    try {
      const orders = await this.orderService.getOrdersByUpdateDate(
        new Date(startDate),
        new Date(endDate)
      );
      return orders;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }
}
