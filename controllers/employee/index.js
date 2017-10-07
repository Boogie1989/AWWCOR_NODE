const EmployeeCtrl = require('./controller');
const employeeCtrl = new EmployeeCtrl('Employee');

module.exports = {
    EmployeeCtrl: EmployeeCtrl,
    employeeRouter: employeeCtrl.createBaseRoutes()
}