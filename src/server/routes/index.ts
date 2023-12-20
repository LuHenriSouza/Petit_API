import { Router } from 'express';
import { ProductController, FincashController, CashOutflowController, SaleDetailController } from './../controllers';

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

// CASHOUTFLOW
router.get('/cashoutflow/:id', CashOutflowController.getAllValidation, CashOutflowController.getAllById);
router.post('/cashoutflow', CashOutflowController.createValidation, CashOutflowController.create);
// router.get('/cashoutflow/:id', CashOutflowController.getByIdValidation, CashOutflowController.getById);
// router.put('/cashoutflow/:id', CashOutflowController.updateByIdValidation, CashOutflowController.updateById);
// router.delete('/cashoutflow/:id', CashOutflowController.deleteByIdValidation, CashOutflowController.deleteById);



// SALE
router.post('/sale', SaleDetailController.createValidation, SaleDetailController.create);
router.get('/sale/:id', SaleDetailController.getAllValidation, SaleDetailController.getAllById);
router.get('/sale', SaleDetailController.getAllValidation, SaleDetailController.getAll);
// router.put('/sale/:id', SaleDetailController.updateByIdValidation, SaleDetailController.updateById);
// router.delete('/sale/:id', SaleDetailController.deleteByIdValidation, SaleDetailController.deleteById);

export { router };
