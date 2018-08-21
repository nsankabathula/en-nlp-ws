const util = require('util');

class FileMetaDataDao {

    constructor(commonDao) {
        console.debug("FileMetaDataDao constructor");
        this.commonDao = commonDao;
        this.tableName = "meta_data";
    }

    findAll(useforTraining) {
        const QUERY = util.format("select txt_file_name txtFileName,  txt_file_path txtFilePath, line_count lineCount, use_for_training useforTraining \
                        from %s  WHERE use_for_training = $useforTraining order by txt_file_name asc", this.tableName);
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
        const QUERY = util.format("select txt_file_name txtFileName,  txt_file_path txtFilePath, line_count lineCount, use_for_training useforTraining \
                        from %s WHERE txt_file_name = $txtFileName", this.tableName);
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
        const QUERY = util.format("select txt_file_name txtFileName,  txt_file_path txtFilePath, line_count lineCount, use_for_training useforTraining \
                        from %s WHERE txt_file_name = $txtFileName", this.tableName);
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
        const QUERY = util.format("update %s set use_for_training = $useforTraining where txt_file_name = $txtFileName ", this.tableName);
        return this.commonDao.run(QUERY, defaultSqlParams);
    }
}

module.exports = FileMetaDataDao;