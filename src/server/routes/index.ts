import { Router } from 'express';
import { ProductController } from './../controllers';

const router = Router();

router.post('/', ProductController.create);

export { router };
