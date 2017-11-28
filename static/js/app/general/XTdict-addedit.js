$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '类型',
        field: 'type',
        hidden: true,
        defaultValue: '0',
        readonly: view
    }, {
        title: '种类',
        field: 'parentKey',
        required: true,
        type: 'select',
        listCode: '620906',
        params: {
            type: 0
        },
        keyName: 'dkey',
        valueName: 'dvalue',
        readonly: !!code,
        defaultOption: '选此创建种类'
    }, {
        title: '字典键',
        field: 'dkey',
        required: true,
        maxlength: 15,
        readonly: !!code
    }, {
        title: '体型信息',
        field: 'dvalue',
        required: true,
        readonly: !!code
    }, {
        title: '是否必填',
        field: 'remark',
        type: "select",
        required: true,
        data: {
            "1": "是",
            "0": "否"
        },
        defaultValue: "1",
        readonly: view,
        help: "当体型信息是：“身高和体重”时，是否必填必须选择“是”"
    }];

    buildDetail({
        fields: fields,
        code: code,
        editCode: '620902',
        view: view,
        detailCode: '620907',
        beforeSubmit: function(data) {
            var dKey = $("#dkey").html();
            if (dKey.indexOf("6") == 0) {
                data.remark = "1";
            };
            data.dvalue = $("#dvalue").html();
            return data;
        }
    });

    $('#parentKey').on('change', function() {
        $('#type').val(this.value == 0 ? '0' : '1');
    });
});