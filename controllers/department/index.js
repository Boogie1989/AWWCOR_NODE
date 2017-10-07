const DepartmentCtrl = require('./controller');
const departmentCtrl = new DepartmentCtrl('Department');

module.exports = {
    DepartmentCtrl: DepartmentCtrl,
    departmentRouter: departmentCtrl.createBaseRoutes()
}