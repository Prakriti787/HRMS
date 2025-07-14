import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin', 'manager'), getAllEmployees);
router.get('/:id', protect, getEmployeeById);
router.post('/', protect, authorizeRoles('admin'), createEmployee);
router.put('/:id', protect, updateEmployee);
router.delete('/:id', protect, authorizeRoles('admin'), deleteEmployee);


export default router;
