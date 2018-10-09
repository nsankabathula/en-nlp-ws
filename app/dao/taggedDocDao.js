const CouchDao = require('../core/couchDao');

class TaggedDocDao extends CouchDao {

    constructor(nano, dbName) {
        super(nano, dbName)
        console.debug("TaggedDocDao constructor");


    }

    view(params) {
        console.log(params)
        return super.view(
            { designName: "config", viewName: "config-view" }
        ).then(
            result => {
                return result
            }
            )
    }




    find(params) {
        const QUERY = {
            bookmark: params.bookmark ? params.bookmark : null,
            limit: params.limit ? params.limit : 10,
            "sort": [

            ],
            "fields": [
                "sentId",
                "sentText",
                "startChar",
                "endChar",
                "name",
                "sentSimilarity",
                "sectionId",
                "sectionText",
                "query",
                "words",
                "rank",
                "docCount"
            ],
            "selector": {
                "sectionId": {
                    "$eq": -1
                },
                "$and": [
                    {
                        "sectionId": {
                            "$eq": -1
                        }
                    },
                    {
                        "query": {
                            "sectionId": {
                                "$eq": params.title
                            }
                        }
                    }
                ]
            },
            execution_stats: false
        }
        return super.find(
            QUERY
        ).then(
            result => {
                return { bookmark: result.bookmark, docs: result.docs };
            }
            )
    }
}

module.exports = TaggedDocDao;