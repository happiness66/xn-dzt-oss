$(function() {
    var code = getQueryString('code');
    var modelCode = getQueryString('modelCode');
    var view = getQueryString('v');

    var fields = [{
        title: "规格名称",
        field: "name",
        required: true,
        readonly: view
    }, {
        field: 'pic',
        title: '缩略图',
        type: "img",
        single: true,
        required: true,
        readonly: view
    }, {
        title: "备注",
        field: "remark",
        readonly: view
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        addCode: "620280",
        detailCode: "620286",
        editCode: '620282',
        beforeSubmit: function(data) {
            data.modelCode = modelCode;
            return data;
        }
    });

});