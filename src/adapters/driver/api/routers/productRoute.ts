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
        const result = await productController.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/orders/:id', async (req, res) => {
    try {
        const result = await productController.update(
            +req.params.id,
            req.body
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/orders/:id', async (req, res) => {
    try {
        await productController.delete(+req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/orders/:id', async (req, res) => {
    try {
        const result = await productController.getById(
            +req.params.id
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const result = await productController.getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
