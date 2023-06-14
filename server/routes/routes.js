import express from 'express';
import { getOne, getAll, addOne, updateOne, updateAll, deleteOne, deleteAll } from '../controllers/controllers.js';

const router = express.Router();

router.get('/one', getOne);
router.get('/', getAll);

router.post('/', addOne);

router.patch('/', updateOne);
router.put('/', updateAll);

router.delete('/one', deleteOne);
router.delete('/', deleteAll);

export default router;