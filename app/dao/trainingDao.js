//const CommonDao = require('../core/common');
const util = require('util');

class TrainingDao {

    constructor(commonDao, tableName) {
        console.debug("TrainingDao constructor");
        this.commonDao = commonDao;
        this.tableName = (tableName) ? tableName : "training_data";
    }

    findAll() {
        const QUERY = util.format("select line_id, debug, target, name from %s order by line_id LIMIT 30", this.tableName);
        return this.commonDao.findAll(
            QUERY
        ).then(
            rows => {
                return rows;
            }
            )
    }

    findAllFileNames() {
        const QUERY = util.format("select name, count(1) line_count from %s group by name", this.tableName);
        return this.commonDao.findAll(
            QUERY
        ).then(
            rows => {
                return rows;
            }
            )
    }

    findById(fileName) {
        const QUERY = util.format("select line_id, debug, target, line_is_first_token_cardinal_0 firstTokenCardinal  from \
                        %s where name = $fileName order by line_id ", this.tableName);
        var sqlParams = { $fileName: fileName };
        return this.commonDao.findAllWithParams(
            QUERY, sqlParams
        ).then(
            rows => {
                return rows;
            }
            )
    }

    compare(fileName) {

        const QUERY = "select t1.debug ,  t1.line_id, t1.line_is_first_token_cardinal_0, t1.target, t2.target predict \
                        from training_data t1 join predicted_data t2 on t1.line_id = t2.line_id and t1.name = t2.name \
                        where t1.name = $fileName order by t1.line_id asc"
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
        const QUERY = util.format("select line_id, debug, target, line_is_first_token_cardinal_0 firstTokenCardinal from \
        %s where name = $fileName  and line_id = $lineId order by line_id ", this.tableName);
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
        const QUERY = util.format("update %s set target = $target where name = $fileName and line_id = $lineId", this.tableName);
        return this.commonDao.run(QUERY, defaultSqlParams);
    }

    merge(fileName) {
        const defaultSqlParams = { $fileName: fileName };
        const QUERY = "UPDATE 	training_data SET target = (SELECT predicted_data.target FROM predicted_data \
            WHERE  training_data.line_id = predicted_data.line_id and training_data.name = predicted_data.name)\
            WHERE\
            name = $fileName"
        return this.commonDao.run(QUERY, defaultSqlParams);
    }

    delete(fileName) {
        const defaultSqlParams = { $fileName: fileName };
        const QUERY = util.format("delete from %s where name = $fileName", this.tableName);
        return this.commonDao.delete(QUERY, defaultSqlParams);
    }

}

module.exports = TrainingDao;