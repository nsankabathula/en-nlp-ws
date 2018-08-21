class FileMetaController {

    constructor(dao, contoller) {
        this.dao = dao;
        this.controller = contoller
    }

    findAll(req, res) {
        let that = this;
        that.dao.findAll(req.params.useforTraining)
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }


    findById(req, res) {
        let that = this;
        that.dao.findById(req.params.txtFileName)
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }
    findOne(req, res) {
        let that = this;
        that.dao.findOne(req.params.txtFileName)
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

    update(req, res) {
        let that = this;
        return that.dao.update(req.params.txtFileName, req.params.useforTraining)
            .then(that.controller.editSuccess(res))
            .catch(that.controller.serverError(res));
    }

}

module.exports = FileMetaController;