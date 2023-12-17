import { Router } from 'express';
import { ProductController } from './../controllers';

const router = Router();

router.get('/product', ProductController.getAllValidation, ProductController.getAll);
router.get('/product/:id', ProductController.getByIdValidation, ProductController.getById);
router.post('/product', ProductController.createValidation, ProductController.create);
router.put('/product/:id', ProductController.updateByIdValidation, ProductController.updateById);
router.delete('/product/:id', ProductController.deleteByIdValidation, ProductController.deleteById);

export { router };
