const { Router } = require('express');
const symbols = {
    _createBaseRoutes: Symbol(),
    _bindMethods: Symbol()
};

module.exports = class BaseCRUDCtrl {

    constructor(model) {
        if (!model) throw new Error('Model is required param');
        this.model = model;
        this.router = new Router();
        this[symbols._bindMethods]();
        this[symbols._createBaseRoutes]();
    }

    async getAll(req, res) {
        try {
            const { app } = req;
            const data = await this.model.find();
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async post(req, res) {
        try {
            const { body } = req;
            const instance = await this.model.create(body);
            return res.json(instance);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { params } = req;
            const instance = await this.model.findById(params.id);
            return res.json(instance);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async patch(req, res) {
        try {
            const { params, body } = req;
            const instance = await this.model.update({ _id: params.id }, { $set: body });
            return res.json(instance);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async remove(req, res) {
        try {
            const { params } = req;
            const instance = await this.model.findByIdAndRemove(params.id);
            return res.json(instance);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    [symbols._createBaseRoutes]() {
        this.router.get(`/${this.model.modelName}s`, this.getAll);
        this.router.get(`/${this.model.modelName}s/:id`, this.getById);
        this.router.patch(`/${this.model.modelName}s/:id`, this.patch);
        this.router.post(`/${this.model.modelName}s`, this.post);
        this.router.delete(`/${this.model.modelName}s/:id`, this.remove);
    }

    [symbols._bindMethods]() {
        this.getAll = this.getAll.bind(this);
        this.post = this.post.bind(this);
        this.getById = this.getById.bind(this);
        this.patch = this.patch.bind(this);
        this.remove = this.remove.bind(this);
    }

}
