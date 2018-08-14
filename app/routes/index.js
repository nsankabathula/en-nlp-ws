const MetaDataRoutes = require('./meta');
const TrainingRoutes = require('./trainingRoutes');
const PythonRoutes = require('./pythonRoutes');

const CommonDao = require('../core/commonDao');
const CommonController = require('../core/commonController');

const TrainingDao = require('../dao/trainingDao');
const TrainingController = require('../controller/trainingController');

const MetaDao = require('../dao/metaDao');
const MetaController = require('../controller/metaController');

const PythonController = require('../controller/pythonController');

module.exports = function (app, db) {

    commonDao = new CommonDao(db);
    commonController = new CommonController();
    trainingDao = new TrainingDao(commonDao);
    metaDao = new MetaDao(commonDao)

    TrainingRoutes(app, new TrainingController(trainingDao, commonController));
    MetaDataRoutes(app, new MetaController(metaDao, commonController));
    PythonRoutes(app, new PythonController(commonController));
    //adminRoutes(app, db);
    // Other route groups could go here, in the future
};