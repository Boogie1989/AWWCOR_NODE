const { departmentRouter } = require('./department');
const { employeeRouter } = require('./employee');

module.exports = function (app) {
    app.use(departmentRouter);
    app.use(employeeRouter);
}