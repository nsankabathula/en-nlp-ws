//const CommonDao = require('../core/common');

class TrainingDao {

    constructor(commonDao) {
        console.debug("TrainingDao constructor");
        this.commonDao = commonDao;
    }

    findAll() {
        const QUERY = "select line_id, debug, target, name from training_data order by line_id LIMIT 30";
        return this.commonDao.findAll(
            QUERY
        ).then(
            rows => {
                return rows;
            }
            )
    }
    findAllFileNames() {
        const QUERY = "select name, count(1) line_count from training_data group by name";
        return this.commonDao.findAll(
            QUERY
        ).then(
            rows => {
                return rows;
            }
            )
    }

    findById(fileName) {
        const QUERY = "select line_id, debug, target, line_is_first_token_cardinal_0 firstTokenCardinal  from training_data where name = $fileName order by line_id ";
        var sqlParams = { $fileName: fileName };
        return this.commonDao.findAllWithParams(
            QUERY, sqlParams
        ).then(
            rows => {
                return rows;
            }
            )
    }

    findByIds(fileName, lineId) {
        const QUERY = "select line_id, debug, target, line_is_first_token_cardinal_0 firstTokenCardinal from training_data where name = $fileName  and line_id = $lineId order by line_id ";
        var sqlParams = { $fileName: fileName, $lineId: lineId };

        return this.commonDao.findOne(
            QUERY, sqlParams
        ).then(
            result => {
                return result;
            }
            )
    }

    update(fileName, lineId, target) {
        const defaultSqlParams = { $fileName: fileName, $lineId: lineId, $target: target };
        const QUERY = "update training_data set target = $target where name = $fileName and line_id = $lineId";
        return this.commonDao.run(QUERY, defaultSqlParams);
    }

    delete(fileName) {
        const defaultSqlParams = { $fileName: fileName };
        const QUERY = "delete from training_data where name = $fileName";
        return this.commonDao.delete(QUERY, defaultSqlParams);
    }

}

module.exports = TrainingDao;