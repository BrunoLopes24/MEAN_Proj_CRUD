// doc -> representa o documento do banco de dados encontrado com base no ID fornecido. 
import express from 'express';
import { EmployeeController } from '../controllers/index.js';


const router = express.Router();

router.get('/employees', EmployeeController.getAll);
router.get('/employees/:id', EmployeeController.getById);
router.put('/employee/:id',EmployeeController.updateById);
router.post('/employee',EmployeeController.create);
router.delete('/employee/:id',EmployeeController.deleteById);


export default router;
