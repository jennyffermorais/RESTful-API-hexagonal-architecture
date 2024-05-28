import { Body, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { IClientService } from '../../../../core/applications/ports/services/IClientService';
import { CreateClientDto, UpdateClientDto } from './dto/ClientDto';

@Route('clients')
@Tags('Clients')
export class ClientController {
  private clientService: IClientService;

  constructor(clientService: IClientService) {
    this.clientService = clientService;
  }

  @Post('/')
  public async create(
    @Body() createClientDto: CreateClientDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const client = await this.clientService.create(createClientDto);
      return client;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Put('/{id}')
  public async update(
    @Path() id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const client = await this.clientService.update(Number(id), updateClientDto);
      if (!client) {
        return notFoundResponse(404, { message: 'Client not found' });
      }
      return client;
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
      const success = await this.clientService.delete(Number(id));
      if (!success) {
        return notFoundResponse(404, { message: 'Client not found' });
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
      const client = await this.clientService.getById(Number(id));
      if (!client) {
        return notFoundResponse(404, { message: 'Client not found' });
      }
      return client;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }

  @Get('/document/{documentNum}')
  public async getClientByDocument(
    @Path() documentNum: string,
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>,
    @Res() internalErrorResponse: TsoaResponse<500, { message: string }>
  ): Promise<any> {
    try {
      const client = await this.clientService.getClientByDocument(documentNum);
      if (!client) {
        return notFoundResponse(404, { message: 'Client not found' });
      }
      return client;
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
      const clients = await this.clientService.getAll({ documentNum });
      return clients;
    } catch (error) {
      return internalErrorResponse(500, { message: 'Internal server error' });
    }
  }
}
