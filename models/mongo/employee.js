const mongoose = require('mongoose');
const DepartmentModel = require('./department');
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

employeeSchema.pre('save', async function (next) {
    console.log(this);
    const exist = await DepartmentModel.count({ _id: this.departmentId });
    if (exist) {
        next();
    } else {
        next(new Error('DepartmentId is wrong.'));
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
