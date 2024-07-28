import { ICustomer } from '../../core/domain/Customer';
import { IRepository } from '../../core/applications/ports/repositories/IRepository';
import { ICustomerService } from '../../core/applications/ports/services/ICustomerService';
import { CustomerEntity } from '../../core/entities/Customer';
import { CreateCustomerEntity } from '../../core/entities/CreateCustomer';

export class CustomerGateway {
  private customerRepository: IRepository<CustomerEntity>;

  constructor(customerRepository: IRepository<CustomerEntity>) {
    this.customerRepository = customerRepository;
  }

  public async create(customerData: Partial<CreateCustomerEntity>): Promise<CustomerEntity> {
    const customer = await this.customerRepository.create(customerData);
    return this.customerRepository.create(customer);
  }

  public async update(id: number, customerData: Partial<CustomerEntity>): Promise<CustomerEntity | null> {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      return null;
    }

    Object.assign(customer, customerData);
    return this.customerRepository.save(customer);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.customerRepository.delete(id);

    return result.affected !== undefined && result.affected! > 0;
  }

  public async getById(id: number): Promise<CustomerEntity | null> {
    const customer = await this.customerRepository.findOneBy({ id });

    return customer || null;
  }

  public async getCustomerByDocument(documentNum: string): Promise<CustomerEntity | null> {
    const customer = await this.customerRepository.findOneBy({ documentNum });

    return customer || null;
  }

  getAll: ICustomerService['getAll'] = async (filters = {}) => {
    const { documentNum } = filters;
    return this.customerRepository.find({ where: { documentNum } });
  };

//   async getAll(filters: { documentNum?: string }): Promise<CustomerEntity[]> {
//     const { documentNum } = filters;
//     return this.customerRepository.find({ where: { documentNum } });
//   };
}
