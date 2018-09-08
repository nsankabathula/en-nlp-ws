const MetaDataRoutes = require('./meta');
const TrainingRoutes = require('./trainingRoutes');
const PythonRoutes = require('./pythonRoutes');
const FileMetaRoutes = require('./fileMetaRoutes');
const DiscoveryRoutes = require('./discoveryRoutes');

const CommonDao = require('../core/commonDao');
const CommonController = require('../core/commonController');

const TrainingDao = require('../dao/trainingDao');
const TrainingController = require('../controller/trainingController');

const MetaDao = require('../dao/metaDao');
const MetaController = require('../controller/metaController');

const PythonController = require('../controller/pythonController');

const FileMetaDataDao = require('../dao/fileMetaDataDao');
const FileMetaController = require('../controller/fileMetaController');

const DiscoveryController = require('../controller/discoveryController')

module.exports = function (app, db) {

    commonDao = new CommonDao(db);
    commonController = new CommonController();
    trainingDao = new TrainingDao(commonDao, "training_features");
    predictionDao = new TrainingDao(commonDao, "predicted_data");
    metaDao = new MetaDao(commonDao)
    fileMetaDao = new FileMetaDataDao(commonDao);

    TrainingRoutes(app, new TrainingController(trainingDao, commonController), "training");
    TrainingRoutes(app, new TrainingController(predictionDao, commonController), "prediction");
    MetaDataRoutes(app, new MetaController(metaDao, commonController));
    PythonRoutes(app, new PythonController(fileMetaDao, commonController));
    FileMetaRoutes(app, new FileMetaController(fileMetaDao, commonController));
    DiscoveryRoutes(app, new DiscoveryController(commonController));
    //adminRoutes(app, db);
    // Other route groups could go here, in the future
};