const baseCRUD = require('../BaseCRUD');
const symbols = {
    _createRoutes: Symbol()
};

module.exports = class EmployeeCtrl extends baseCRUD {

    constructor(model) {
        super(model);
        this[symbols._createRoutes]();
    }

    async getAllInDepartment(req, res) {
        try {
            const { app, params } = req;
            const { Employee } = app.get('models');
            const employees = await Employee.find({ departmentId: params.departmentId });
            return res.json(employees);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    [symbols._createRoutes]() {
        this.router.get('/employees/getAllInDepartment/:departmentId', this.getAllInDepartment);
    }

}