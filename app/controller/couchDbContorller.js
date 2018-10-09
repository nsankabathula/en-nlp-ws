
class CouchDBContoller {

    constructor(dao, contoller) {
        this.dao = dao;
        this.controller = contoller
    }

    buildParams(req) {

        return {
            db: req.params.db,
            body: req.body,
            params: req.params
        }
    }

    docs(req, res) {
        let that = this;
        that.dao.docs(that.buildParams(req))
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

    view(req, res) {
        let that = this;
        that.dao.view(that.buildParams(req))
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

    find(req, res) {
        let that = this;
        that.dao.find(that.buildParams(req))
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));
    }



    findOne(req, res) {
        let that = this;
        that.dao.findOne(that.buildParams(req))
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

}

module.exports = CouchDBContoller;