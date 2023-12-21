import { Router } from 'express';
import { ProductController, FincashController, CashOutflowController, SaleDetailController, UserController } from './../controllers';
import { ensureAuthenticated, ensureAdmin } from '../shared/middleware';

const router = Router();


// CREATE SUPER USER
router.get('/superuser', UserController.createSuperUser);

// PRODUCT
router.get('/product', ensureAuthenticated, ProductController.getAllValidation, ProductController.getAll);
router.get('/product/:id', ensureAuthenticated, ProductController.getByIdValidation, ProductController.getById);
router.post('/product', ensureAuthenticated, ProductController.createValidation, ProductController.create);
router.put('/product/:id', ensureAuthenticated, ProductController.updateByIdValidation, ProductController.updateById);
router.delete('/product/:id', ensureAuthenticated, ProductController.deleteByIdValidation, ProductController.deleteById);



// FINCASH
router.get('/fincash', ensureAuthenticated, FincashController.getAllValidation, FincashController.getAll);
router.get('/fincash/:id', ensureAuthenticated, FincashController.getByIdValidation, FincashController.getById);
router.post('/fincash', ensureAuthenticated, FincashController.createValidation, FincashController.create);
router.delete('/fincash/:id', ensureAuthenticated, ensureAdmin, FincashController.deleteByIdValidation, FincashController.deleteById);
router.put('/fincash/finish/:id', ensureAuthenticated, ensureAdmin, FincashController.updateByIdValidation, FincashController.finish);
// router.put('/fincash/:id',ensureAuthenticated, FincashController.updateByIdValidation, FincashController.updateById);



// CASHOUTFLOW
router.get('/cashoutflow/:id', ensureAuthenticated, CashOutflowController.getAllValidation, CashOutflowController.getAllById);
router.post('/cashoutflow', ensureAuthenticated, CashOutflowController.createValidation, CashOutflowController.create);
// router.get('/cashoutflow/:id',ensureAuthenticated, CashOutflowController.getByIdValidation, CashOutflowController.getById);
// router.put('/cashoutflow/:id',ensureAuthenticated, CashOutflowController.updateByIdValidation, CashOutflowController.updateById);
// router.delete('/cashoutflow/:id',ensureAuthenticated, CashOutflowController.deleteByIdValidation, CashOutflowController.deleteById);



// SALE
router.post('/sale', ensureAuthenticated, SaleDetailController.createValidation, SaleDetailController.create);
router.get('/sale/:id', ensureAuthenticated, SaleDetailController.getAllValidation, SaleDetailController.getAllById);
router.get('/sale', ensureAuthenticated, SaleDetailController.getAllValidation, SaleDetailController.getAll);
// router.put('/sale/:id',ensureAuthenticated, SaleDetailController.updateByIdValidation, SaleDetailController.updateById);
// router.delete('/sale/:id',ensureAuthenticated, SaleDetailController.deleteByIdValidation, SaleDetailController.deleteById);



// USER
router.post('/register', ensureAuthenticated, ensureAdmin, UserController.createValidation, UserController.signUp);
router.post('/login', UserController.signInValidation, UserController.signIn);


export { router };
