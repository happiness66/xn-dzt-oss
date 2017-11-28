$(function() {
    var code = getQueryString('code');
    //预约
    var fields = [{
        field: 'applyUser',
        title: '下单人编号',
        type: 'select',
        pageCode: '805120',
        params: {
            kind: "C",
            status: "0",
            updater: ""
        },
        keyName: 'userId',
        searchName: 'nickname',
        valueName: '{{nickname.DATA}}--{{mobile.DATA}}',
        required: true
    }, {
        field: 'applyName',
        title: '下单人姓名',
        required: true,
        maxlength: 32
    }, {
        field: 'applyMobile',
        title: '下单人手机号',
        mobile: true,
        required: true,
    }, {
        title: "身高(cm)",
        field: "height",
        maxlength: 255,
        required: true,
    }, {
        title: "体重(kg)",
        field: "weight",
        maxlength: 255,
        required: true,
    }, {
        field: 'ltDatetime',
        title: '量体时间',
        required: true,
        type: 'date'
    }, {
        field: 'Province1',
        title: '量体地址',
        type: "citySelect",
        required: true
    }, {
        title: "量体详细地址",
        field: "ltAddress",
        maxlength: 64,
        required: true,
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: '620200',
        beforeSubmit: function(data) {
            data.ltProvince = data.province;
            data.ltCity = data.city;
            data.ltArea = data.area;
            var height = data.height;
            var weight = data.weight;
            data.map = { "6-02": height, "6-03": weight };
            return data
        }
    });

});