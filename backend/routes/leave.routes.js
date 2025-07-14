import express from 'express';
import {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequest,
  deleteLeaveRequest
} from '../controllers/leaveController.js';

const router = express.Router();
router.get('/', protect, authorizeRoles('admin', 'manager'), getAllLeaveRequests);
router.get('/my-leaves', protect, getMyLeaves);
router.post('/', protect, authorizeRoles('employee'), createLeaveRequest);
router.patch('/:id/approve', protect, authorizeRoles('admin', 'manager'), approveLeave);


export default router;
