import { Router } from 'express';
import { ProductController, FincashController } from './../controllers';

const router = Router();

// PRODUCT
router.get('/product', ProductController.getAllValidation, ProductController.getAll);
router.get('/product/:id', ProductController.getByIdValidation, ProductController.getById);
router.post('/product', ProductController.createValidation, ProductController.create);
router.put('/product/:id', ProductController.updateByIdValidation, ProductController.updateById);
router.delete('/product/:id', ProductController.deleteByIdValidation, ProductController.deleteById);

// FINCASH
router.get('/fincash', FincashController.getAllValidation, FincashController.getAll);
router.get('/fincash/:id', FincashController.getByIdValidation, FincashController.getById);
router.post('/fincash', FincashController.createValidation, FincashController.create);
// router.put('/fincash/:id', FincashController.updateByIdValidation, FincashController.updateById);
router.delete('/fincash/:id', FincashController.deleteByIdValidation, FincashController.deleteById);
router.put('/fincash/finish/:id', FincashController.updateByIdValidation, FincashController.finish);


export { router };
