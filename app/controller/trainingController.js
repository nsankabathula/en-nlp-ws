class TrainingController {

    constructor(dao, contoller) {
        this.dao = dao;
        this.controller = contoller
    }

    findAll(req, res) {
        let that = this;
        that.dao.findAll()
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

    findAllFiles(req, res) {
        let that = this;
        that.dao.findAllFileNames()
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }


    findByFileName(req, res) {
        let that = this;
        that.dao.findById(req.params.fileName)
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

    findByLineId(req, res) {
        let that = this;
        that.dao.findByIds(req.params.fileName, req.params.lineId)
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }
    compare(req, res) {
        let that = this;
        that.dao.compare(req.params.fileName)
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

    merge(req, res) {

        let that = this;
        return that.dao.update(req.params.fileName)
            .then(that.controller.editSuccess(res))
            .catch(that.controller.serverError(res));
    }

    update(req, res) {
        let that = this;
        return that.dao.update(req.params.fileName, req.params.lineId, req.params.target)
            .then(that.controller.editSuccess(res))
            .catch(that.controller.serverError(res));
    }

    delete(req, res) {
        let that = this;
        return that.dao.delete(req.params.fileName)
            .then(that.controller.deleteSuccess(res))
            .catch(that.controller.serverError(res));


    }

}

module.exports = TrainingController;