import { Router } from 'express';
// import { StatusCodes } from 'http-status-codes';

const router = Router();


router.post('/', (req, res) => {
    return res.json('Hello');
});






export { router };