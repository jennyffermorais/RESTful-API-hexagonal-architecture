import { Router } from 'express';
import { IProductService } from '../../../../core/applications/ports/services/IProductService';
import { ProductService } from '../../../../core/applications/services/ProductService';
import { AppDataSource } from '../../../../data-source';
import { ProductController } from '../controller/ProductController';
import { ProductRepository } from '../repository/ProductRepository';

const productRepository = new ProductRepository(AppDataSource);
const productService: IProductService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = Router();
router.post('/products', async (req, res) => {
  try {
    const result = await productController.createProduct(req.body, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const result = await productController.updateProduct(
      req.params.id,
      req.body,
      res.status.bind(res, 404),
      res.status.bind(res, 500)
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await productController.deleteProduct(req.params.id, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const result = await productController.getProductById(
      req.params.id,
      res.status.bind(res, 404),
      res.status.bind(res, 500)
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/products', async (req, res) => {
  try {
    const result = await productController.getAllProducts(res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
