import { Department } from "../models/Department.js";

// Create Department
export const createDepartment = async (req, res) => {
  try {
    const { name, description, managerId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const department = new Department({ name, description, managerId });
    await department.save();

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get All Departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("managerId", "firstName lastName email");
    res.status(200).json({
      message: "Departments fetched successfully",
      departments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get Department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id).populate("managerId", "firstName lastName email");

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department fetched successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update Department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const department = await Department.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department deleted successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
