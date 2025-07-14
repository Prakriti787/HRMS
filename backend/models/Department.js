const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  managerId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
}, { timestamps: true }); // includes createdAt and updatedAt automatically

module.exports = mongoose.model('Department', DepartmentSchema);
