const metaDataRoutes = require('./meta');
const trainingRoutes = require('./training');

const CommonDao = require('../core/commonDao');
const CommonController = require('../core/commonController');

const TrainingDao = require('../dao/trainingDao');
const TrainingController = require('../controller/trainingController');

const MetaDao = require('../dao/metaDao');
const MetaController = require('../controller/metaController');

module.exports = function (app, db) {

    commonDao = new CommonDao(db);
    commonController = new CommonController();
    trainingDao = new TrainingDao(commonDao);
    metaDao = new MetaDao(commonDao)

    trainingRoutes(app, new TrainingController(trainingDao, commonController));
    metaDataRoutes(app, new MetaController(metaDao, commonController));
    //adminRoutes(app, db);
    // Other route groups could go here, in the future
};