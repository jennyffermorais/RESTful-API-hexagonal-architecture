import { IProduct } from '../../domain/Product';
import { IService } from './IService';

export interface IProductService extends IService<IProduct> {}
