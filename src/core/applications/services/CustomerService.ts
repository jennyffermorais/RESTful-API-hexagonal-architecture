import { ICustomer } from '../../domain/Customer';
import { IRepository } from '../ports/repositories/IRepository';
import { ICustomerService } from '../ports/services/ICustomerService';

export class CustomerService implements ICustomerService {
  private customerRepository: IRepository<ICustomer>;

  constructor(customerRepository: IRepository<ICustomer>) {
    this.customerRepository = customerRepository;
  }

  public async create(customerData: Partial<ICustomer>): Promise<ICustomer> {
    const customer = await this.customerRepository.create(customerData);
    return this.customerRepository.save(customer);
  }

  public async update(id: number, customerData: Partial<ICustomer>): Promise<ICustomer | null> {
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

  public async getById(id: number): Promise<ICustomer | null> {
    const customer = await this.customerRepository.findOneBy({ id });

    return customer || null;
  }

  public async getCustomerByDocument(documentNum: string): Promise<ICustomer | null> {
    const customer = await this.customerRepository.findOneBy({ documentNum });

    return customer || null;
  }

  getAll: ICustomerService['getAll'] = async (filters = {}) => {
    const { documentNum } = filters;
    return this.customerRepository.find({ where: { documentNum } });
  };
}
