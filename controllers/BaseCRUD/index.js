const { Router } = require('express');

module.exports = class BaseCRUDCtrl {
    constructor(modelName) {
        if (!modelName) throw new Error('Model name is required param');
        this.router = new Router();
        this.modelName = modelName;
        this.getAll = this.getAll.bind(this);
        this.post = this.post.bind(this);
        this.getById = this.getById.bind(this);
        this.patch = this.patch.bind(this);
        this.remove = this.remove.bind(this);
        this.createBaseRoutes = this.createBaseRoutes.bind(this);
    }
    async getAll(req, res) {
        try {
            const { app } = req;
            const models = app.get('models');
            const data = await models[this.modelName].find();
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async post(req, res) {
        try {
            const { app, body } = req;
            const models = app.get('models');
            const instance = await models[this.modelName].create(body);
            return res.json(instance);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const { app, params } = req;
            const models = app.get('models');
            const instance = await models[this.modelName].findById(params.id);
            return res.json(instance);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async patch(req, res) {
        try {
            const { app, params, body } = req;
            const models = app.get('models');
            const instance = await models[this.modelName].update({ _id: params.id }, { $set: body });
            return res.json(instance);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async remove(req, res) {
        try {
            const { app, params } = req;
            const models = app.get('models');
            const instance = await models[this.modelName].findByIdAndRemove(params.id);
            return res.json(instance);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    createBaseRoutes() {
        this.router.get(`/${this.modelName}s`, this.getAll);
        this.router.get(`/${this.modelName}s/:id`, this.getById);
        this.router.patch(`/${this.modelName}s/:id`, this.patch);
        this.router.post(`/${this.modelName}s`, this.post);
        this.router.delete(`/${this.modelName}s/:id`, this.remove);
        return this.router;
    }
}
