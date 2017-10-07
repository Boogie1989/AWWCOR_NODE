const BaseCRUD = require('./BaseCRUD');
const EmployeeCtrl = require('./employee');

module.exports = function (app) {

    const { Department, Employee } = app.get('models');

    app.use(new BaseCRUD(Department).router);
    app.use(new EmployeeCtrl(Employee).router);

}