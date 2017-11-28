$(function() {

    var code = getQueryString('code');

    var fields = [{
        title: '参数键',
        field: 'ckey',
        required: true,
        readonly: true
    }, {
        title: '参数值',
        field: 'cvalue',
        required: true,
        maxlength: 255
    }, {
        title: '参数说明',
        field: 'remark',
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '620916',
        editCode: '620911'
    });
});