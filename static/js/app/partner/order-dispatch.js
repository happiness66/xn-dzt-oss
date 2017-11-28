$(function() {
    var code = getQueryString('code');
    var province;
    var city;
    var area;
    reqApi({
        code: "805121",
        json: { userId: sessionStorage.getItem('userId') },
        sync: true
    }).then(function(data) {
        province = data.province;
        city = data.city;
        area = data.area;
    });

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
        },
        {
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
            title: "选择量体师",
            field: 'ltUser',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{realName.DATA}}--{{mobile.DATA}}',
            searchName: "mobile",
            params: {
                kind: "B",
                province: province,
                city: city,
                area: area,
                status: '0',
                userReferee: sessionStorage.getItem('userId'),
                updater: '',

            },
            required: true
        }
    ];

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