const { Router } = require('express');
const EmployeeCtrl = require('./controller');
const employeeCtrl = new EmployeeCtrl('Employee');
const employeeRouter = new Router();

employeeRouter.get('/employees', employeeCtrl.getAll);
employeeRouter.get('/employees/:id', employeeCtrl.getById);
employeeRouter.get('/employees/getAllInDepartment/:departmentId', employeeCtrl.getAllInDepartment);

employeeRouter.patch('/employees/:id', employeeCtrl.patch);

employeeRouter.post('/employees', employeeCtrl.post);



module.exports = employeeRouter;