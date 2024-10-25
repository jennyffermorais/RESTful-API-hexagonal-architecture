import { CustomerGateway } from '../../adapters/gateway/Customer';
import { ICustomerService } from '../../core/applications/ports/services/ICustomerService';
import { CustomerEntity } from '../../core/entities/Customer';
import { CreateCustomerEntity } from '../entities/CreateCustomer';

export class CustomerUseCase {
  private customerGateway: CustomerGateway;

  constructor(customerGateway: CustomerGateway) {
    this.customerGateway = customerGateway;
  }

  public async create(
    name: string,
    documentNum: string,
    dateBirthday: string,
    email: string
  ): Promise<CustomerEntity> {
    try {
      const customerEntity = new CreateCustomerEntity(name, documentNum, dateBirthday, email);
      const customer = await this.customerGateway.create(customerEntity);
      return customer;
    } catch (e) {
      throw e;
    }
  }

  public async update(
    id: number,
    name: string,
    documentNum: string,
    dateBirthday: string,
    email: string
  ): Promise<CustomerEntity | null> {
    try {
      const customerEntity = new CustomerEntity(id, name, documentNum, dateBirthday, email);
      const customer = await this.customerGateway.update(id, customerEntity);
      return customer;
    } catch (e) {
      throw e;
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const result = await this.customerGateway.delete(id);
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async getById(id: number): Promise<CustomerEntity | null> {
    try {
        const customer = await this.customerGateway.getById(id );
        return customer;
    } catch (e) {
       return null;
    }

  }

  public async getCustomerByDocument(documentNum: string): Promise<CustomerEntity | null> {
    try {
        const customer = await this.customerGateway.getCustomerByDocument(documentNum);
        return customer;
    } catch (e) {
       return null;
    }
  }

  public async getAll(filters = {}){
    try {
        const customer = await this.customerGateway.getAll(filters);
        return customer;
    } catch (e) {
       return null;
    }
  };
}
