const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    salary: {
        type: Number
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
});
module.exports = mongoose.model('Employee', employeeSchema);
