$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '关键字',
        field: 'word',
        required: true,
        readonly: view,
        maxlength: 30
    }, {
        title: '权重',
        field: 'weight',
        required: true,
        value: '1',
        hidden: true
    }, {
        field: 'level',
        title: '作用等级',
        value: '0',
        required: true,
        hidden: true
    }, {
        title: '反应',
        field: 'reaction',
        required: true,
        value: '3',
        hidden: true
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250,
        readonly: view,
    }, {
        title: '更新人',
        field: 'updater',
        hidden: true,
        value: getUserName(),
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '620156',
        addCode: '620150',
        editCode: '620152'
    });
});