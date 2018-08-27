const util = require('util');

class FileMetaDataDao {

    constructor(commonDao) {
        console.debug("FileMetaDataDao constructor");
        this.commonDao = commonDao;
        this.tableName = "meta_data";
        this.baseQuery = "SELECT txtFileName, txtFilePath, lineCount \
                                , useforTraining, substr(txtFilePath, 0, INSTR(txtFilePath, txtFileName)) fileLocation \
                                , subGrp, grp FROM %s  WHERE 1 = 1 "
    }

    findAll(useforTraining) {
        const QUERY = util.format(this.baseQuery + " AND useforTraining = $useforTraining order by txtFileName asc", this.tableName);
        var sqlParams = { $useforTraining: useforTraining };
        return this.commonDao.findAllWithParams(
            QUERY, sqlParams
        ).then(
            rows => {
                return rows;
            }
            )
    }

    findById(txtFileName) {
        const QUERY = util.format(this.baseQuery + " AND txtFileName = $txtFileName", this.tableName);
        var sqlParams = { $txtFileName: txtFileName };
        return this.commonDao.findAllWithParams(
            QUERY, sqlParams
        ).then(
            rows => {
                return rows;
            }
            )
    }
    //findOne
    findOne(txtFileName) {
        const QUERY = util.format(this.baseQuery + " AND txtFileName = $txtFileName", this.tableName);
        var sqlParams = { $txtFileName: txtFileName };
        return this.commonDao.findOne(
            QUERY, sqlParams
        ).then(
            rows => {
                return rows;
            }
            )
    }

    update(txtFileName, useforTraining) {
        const defaultSqlParams = { $txtFileName: txtFileName, $useforTraining: useforTraining };
        const QUERY = util.format("UPDATE %s SET useforTraining = $useforTraining WHERE txtFileName = $txtFileName ", this.tableName);
        return this.commonDao.run(QUERY, defaultSqlParams);
    }
}

module.exports = FileMetaDataDao;