// import express from 'express';
// import {
//   createEmployee,
//   getAllEmployees,
//   getEmployeeById,
//   updateEmployee,
//   deleteEmployee
// } from '../controllers/employeeController.js';

// import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Only logged-in users can create, and only admins can delete
// router.post('/', protect, authorizeRoles('admin', 'manager'), createEmployee);
// router.get('/', protect, getAllEmployees);
// router.get('/:id', protect, getEmployeeById);
// router.put('/:id', protect, authorizeRoles('admin', 'manager'), updateEmployee);
// router.delete('/:id', protect, authorizeRoles('admin'), deleteEmployee);

// export default router;
import express from 'express';
const UserSchema =new mongoose.schema(
  {
    id:{
      type:objectId,
      required:[true, "Id is required"],
      trim:true,
    },
    firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
   
      } 
);
export const User = mongoose.model("User", UserSchema);