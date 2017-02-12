'use strict';
var jsonSql = require('json-sql')();
jsonSql.setDialect("sqlite");

var model = [
    {
        name: "username",
        type: "String",
        length: 20,
        filter: {
            type: "string",
            maxLength: 20,
            minLength: 1
        },
        conv: String,
        constante: true
    },
    {
        name: "delegates",
        type: "Text",
        filter: {
            type: "array",
            uniqueItems: true
        },
        conv: Array,
        expression: "(select GROUP_CONCAT(dependentId) from " + this.table + "2delegates where accountId = a.address)"
    },
];

var sql = jsonSql.build({
    type: 'create',
    table: 'lichao',
    tableFields: model
});

console.log(sql.query);

sql = jsonSql.build({
    type: 'select',
    table: 'lichao',
    fields:{
        username:model[0],
        delegates:model[1]
    }
});

console.log(sql.query);
