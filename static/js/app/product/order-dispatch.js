$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: '订单号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code
        },
        readonly: true
    }, {
        title: '状态',
        field: 'status',
        key: "order_status",
        formatter: Dict.getNameForList("order_status"),
        readonly: true
    }, {
        title: '下单人',
        field: 'applyName',
        readonly: true
    }, {
        title: '联系方式',
        field: 'applyMobile',
        readonly: true
    }, {
        title: '量体地址',
        field: 'province1',
        formatter: function(v, data) {
            if (data.ltProvince == data.ltCity && data.ltCity == data.ltArea) {
                data.ltCity = "";
                data.ltArea = "";
            } else if (data.ltProvince == data.ltCity && data.ltCity != data.ltArea) {
                data.ltCity = '';
            }
            var result = (data.ltProvince || "") + (data.ltCity || "") + (data.ltArea || "") + (data.ltAddress || "");
            return result || "-";
        },
        readonly: true
    }, {
        title: '量体时间',
        field: 'ltDatetime',
        formatter: dateFormat,
        readonly: true
    }, {
        title: "所属区域",
        type: "citySelect",
        field: "liangti",
        afterSet: function(v, data) {
            if (data.ltUserDO) {
                if (data.ltUserDO.province == data.ltUserDO.city && data.ltUserDO.city == data.ltUserDO.area) {
                    data.ltUserDO.city = "";
                    data.ltUserDO.area = "";
                } else if (data.ltUserDO.province == data.ltUserDO.city && data.ltUserDO.city != data.ltUserDO.area) {
                    data.ltUserDO.city = data.ltUserDO.area;
                }
                $('#province').val(data.ltUserDO.province);
                $("#province").trigger("change");
                data.ltUserDO.city && $('#city').val(data.ltUserDO.city);
                data.ltUserDO.area && $('#area').val(data.ltUserDO.area);
                data.ltUserDO.city ? $('#city').trigger('change') : $('#province').trigger('change');
                data.ltUserDO.area && $('#area').val(data.ltUserDO.area);
            }
        },
        onChange: function(v, r) {
            var province = $("#province").val();
            var city = $("#city").val();
            var area = $("#area").val();
            if (!city && !area) {
                // city = province;
                // area = province;
            } else if (!area) {
                if (!$("#area:visible").length) {
                    area = city;
                    city = province;
                }
            };
            $('#ltUser').renderDropdown({
                listCode: '805123',
                keyName: 'userId',
                valueName: '{{mobile.DATA}}--{{realName.DATA}}',
                searchName: "mobile",
                params: {
                    kind: "B",
                    province: province,
                    city: city,
                    area: area,
                    status: '0',
                    userRefere: sessionStorage.getItem('userId'),
                    updater: ''
                }
            });
        }
    }, {
        title: "量体师",
        field: 'ltUser',
        type: 'select',
        listCode: '805123',
        keyName: 'userId',
        valueName: '{{mobile.DATA}}--{{realName.DATA}}',
        searchName: "mobile",
        params: {
            kind: "B",
            province: $("#province").val(),
            city: $("#city").val(),
            area: $("#area").val(),
            status: '0',
            userRefere: sessionStorage.getItem('userId'),
            updater: ''
        },
        required: true
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '620231'
    };

    options.buttons = [{
        title: '确认',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['orderCode'] = code;
                data['ltUser'] = $("#ltUser").val();
                data['remark'] = $("#remark").val();
                reqApi({
                    code: "620202",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
    buildDetail(options);
});