import {
    UserController,
    ProductController,
    FincashController,
    SupplierController,
    ValidityController,
    SaleDetailController,
    CashOutflowController,
} from './../controllers';
import { Router } from 'express';
import { StockController } from '../controllers/Stock';
import { ProdGroupController } from '../controllers/ProductGroup';
import { ensureAuthenticated, ensureAdmin } from '../shared/middleware';

const router = Router();



// CREATE SUPER USER
router.get('/superuser', UserController.createSuperUser);



// PRODUCT
router.get('/product', ensureAuthenticated, ProductController.getAllValidation, ProductController.getAll);
router.post('/product', ensureAuthenticated, ProductController.createValidation, ProductController.create);
router.get('/product/:id', ensureAuthenticated, ProductController.getByIdValidation, ProductController.getById);
router.get('/product/code/:code', ensureAuthenticated, ProductController.getByCode, ProductController.getByCode);
router.put('/product/:id', ensureAuthenticated, ProductController.updateByIdValidation, ProductController.updateById);
router.delete('/product/:id', ensureAuthenticated, ProductController.deleteByIdValidation, ProductController.deleteById);



// FINCASH
router.get('/fincash/last', ensureAuthenticated, FincashController.getLastFincash);
router.get('/fincash/verify', ensureAuthenticated, FincashController.getByFinished);
router.get('/fincash', ensureAuthenticated, FincashController.getAllValidation, FincashController.getAll);
router.post('/fincash', ensureAuthenticated, FincashController.createValidation, FincashController.create);
router.get('/fincash/:id', ensureAuthenticated, FincashController.getByIdValidation, FincashController.getById);
// router.put('/fincash/:id',ensureAuthenticated, FincashController.updateByIdValidation, FincashController.updateById);
router.put('/fincash/finish/:id', ensureAuthenticated, FincashController.updateByIdValidation, FincashController.finish);
router.post('/fincash/addcard', ensureAuthenticated, ensureAdmin, FincashController.calcBreakValidation, FincashController.calcBreak);
router.delete('/fincash/:id', ensureAuthenticated, ensureAdmin, FincashController.deleteByIdValidation, FincashController.deleteById);
router.get('/total-value/fincash/:id', ensureAuthenticated, FincashController.getTotalByFincashValidation, FincashController.getTotalByFincash);



// CASHOUTFLOW
router.post('/cashoutflow', ensureAuthenticated, CashOutflowController.createValidation, CashOutflowController.create);
router.get('/cashoutflow/:id', ensureAuthenticated, CashOutflowController.getByIdValidation, CashOutflowController.getById);
router.put('/cashoutflow/:id', ensureAuthenticated, CashOutflowController.updateByIdValidation, CashOutflowController.updateById);
router.get('/cashoutflow/all/:id', ensureAuthenticated, CashOutflowController.getAllValidation, CashOutflowController.getAllById);
router.get('/cashoutflow/total/:id', ensureAuthenticated, CashOutflowController.getTotalByIdValidation, CashOutflowController.getTotalById);
// router.delete('/cashoutflow/:id',ensureAuthenticated, CashOutflowController.deleteByIdValidation, CashOutflowController.deleteById);



// SALE
router.get('/sale', ensureAuthenticated, SaleDetailController.getAllValidation, SaleDetailController.getAll);
router.post('/sale', ensureAuthenticated, SaleDetailController.createValidation, SaleDetailController.create);
router.get('/sale/all', ensureAuthenticated, SaleDetailController.getSalesValidation, SaleDetailController.getSales);
router.get('/sale/raw/:id', ensureAuthenticated, SaleDetailController.getByIdValidation, SaleDetailController.getById);
router.put('/sale/:id', ensureAuthenticated, SaleDetailController.updateByIdValidation, SaleDetailController.updateById);
router.get('/sale/all/:id', ensureAuthenticated, SaleDetailController.getAllByIdValidation, SaleDetailController.getAllById);
router.get('/sale/fincash/:id', ensureAuthenticated, SaleDetailController.getSalesByFincashValidation, SaleDetailController.getSalesByFincash);
router.get('/sale/complete/:id', ensureAuthenticated, ensureAdmin, SaleDetailController.getAllByFincashValidation, SaleDetailController.getAllByFincash);
// router.delete('/sale/:id',ensureAuthenticated, SaleDetailController.deleteByIdValidation, SaleDetailController.deleteById);



// USER
router.post('/login', UserController.signInValidation, UserController.signIn);
router.post('/register', ensureAuthenticated, ensureAdmin, UserController.createValidation, UserController.signUp);



// GROUP
router.get('/group/show', ensureAuthenticated, ProdGroupController.getShowGroups);
router.get('/group', ensureAuthenticated, ProdGroupController.getAllValidation, ProdGroupController.getAll);
router.post('/group', ensureAuthenticated, ProdGroupController.createValidation, ProdGroupController.create);
router.put('/group/show/:id', ensureAuthenticated, ProdGroupController.updateShowValidation, ProdGroupController.updateShow);
router.delete('/group/:id', ensureAuthenticated, ProdGroupController.deleteGroupByIdValidation, ProdGroupController.deleteGroupById);
router.post('/group/product/:id', ensureAuthenticated, ProdGroupController.putProdInGroupValidation, ProdGroupController.putProdInGroup);
router.get('/group/product/:id', ensureAuthenticated, ProdGroupController.getProductsByIdValidation, ProdGroupController.getProductsById);
router.post('/group/product/remove/:id', ensureAuthenticated, ProdGroupController.deleteProductByIdValidation, ProdGroupController.deleteProductById);



// STOCK
router.get('/stock', ensureAuthenticated, StockController.getAllValidation, StockController.getAll);
router.post('/stock', ensureAuthenticated, StockController.createValidation, StockController.create);
router.get('/stock/:id', ensureAuthenticated, StockController.getAllByIdValidation, StockController.getAllById);
router.put('/stock/:id', ensureAuthenticated, ensureAdmin, StockController.updateByIdValidation, StockController.updateById);
router.delete('/stock/:id', ensureAuthenticated, ensureAdmin, StockController.deleteByIdValidation, StockController.deleteById);



// SUPPLIER
router.get('/supplier', ensureAuthenticated, SupplierController.getAllValidation, SupplierController.getAll);
router.get('/supplier/:id', ensureAuthenticated, SupplierController.getByIdValidation, SupplierController.getById);
router.post('/supplier', ensureAuthenticated, ensureAdmin, SupplierController.createValidation, SupplierController.create);
router.put('/supplier/:id', ensureAuthenticated, ensureAdmin, SupplierController.updateByIdValidation, SupplierController.updateById);
router.delete('/supplier/:id', ensureAuthenticated, ensureAdmin, SupplierController.deleteByIdValidation, SupplierController.deleteById);



// VALIDITIES
router.post('/validity', ensureAuthenticated, ValidityController.createValidation, ValidityController.create);
router.get('/validity/all', ensureAuthenticated, ValidityController.getAllValidation, ValidityController.getAll);
router.get('/validity/:id', ensureAuthenticated, ValidityController.getAllByIdValidation, ValidityController.getAllById);
router.delete('/validity/:id', ensureAuthenticated, ValidityController.deleteByIdValidation, ValidityController.deleteById);




export { router };
