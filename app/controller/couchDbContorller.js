class CouchDBContoller {

    constructor(dao, contoller) {
        this.dao = dao;
        this.controller = contoller
    }

    all(req, res) {
        let that = this;
        that.dao.all()
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

    find(req, res) {
        let that = this;
        that.dao.find(req.body)
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));
    }



    findOne(req, res) {
        let that = this;
        that.dao.findOne(req.body)
            .then(that.controller.findSuccess(res))
            .catch(that.controller.findError(res));

    }

}

module.exports = CouchDBContoller;