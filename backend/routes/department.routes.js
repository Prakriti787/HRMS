import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin', 'manager'), getAllDepartments);
router.get('/:id', protect, authorizeRoles('admin', 'manager'), getDepartmentById);
router.post('/', protect, authorizeRoles('admin'), createDepartment);
router.put('/:id', protect, authorizeRoles('admin'), updateDepartment);


export default router;
