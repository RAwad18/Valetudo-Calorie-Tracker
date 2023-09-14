import express from 'express';
import { getOne, getAll, addOne, updateOne, updateAll, deleteOne, deleteAll, apiTest } from '../controllers/controllers.js';
import {getUserData, createUserData, updateUserData} from '../controllers/userdata.js'

const router = express.Router();

router.get('/one', getOne);
router.get('/', getAll);
router.get('/userdata', getUserData)

router.post('/', addOne);
router.post('/userdata', createUserData)

router.patch('/', updateOne);
router.put('/', updateAll);
router.put('/userdata', updateUserData)

router.delete('/one', deleteOne);
router.delete('/', deleteAll);

router.get('/api_test', apiTest)

export default router;