const { Router } = require('express');
const DepartmentCtrl = require('./controller');
const departmentCtrl = new DepartmentCtrl('Department');
const departmentRouter = new Router();

departmentRouter.get('/departments', departmentCtrl.getAll);
departmentRouter.get('/departments/:id', departmentCtrl.getById);
departmentRouter.patch('/departments/:id', departmentCtrl.patch);
departmentRouter.post('/departments', departmentCtrl.post);

module.exports = departmentRouter;