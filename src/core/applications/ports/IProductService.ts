import { Product } from '../../../adapters/driven/repository/Product';
import { IService } from './IService';

export interface IProductService extends IService<Product> {}
