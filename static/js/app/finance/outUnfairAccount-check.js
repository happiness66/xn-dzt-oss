$(function() {
    var code = getQueryString('code');
    var view = true;

    var fields = [{
        field: 'code1',
        title: '编号',
        readonly: true,
        formatter: function(v, data) {
            return data.code
        }
    }, {
        field: 'direction',
        title: '方向',
        type: 'select',
        data: {
            '0': '红冲',
            '1': '蓝补'
        },
        readonly: true
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'applyUser',
        title: '申请人',
        readonly: true
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: "流水明细",
        field: "jourList",
        type: "o2m",
        readonly: true,
        columns: [{
            field: 'code',
            title: '流水号'
        }, {
            field: 'accountNumber',
            title: '户名'
        }, {
            title: "币种",
            field: "currency",
            type: "select",
            key: "currency_type",
            formatter: Dict.getNameForList("currency_type")
        }, {
            field: 'channelType',
            title: '渠道',
            type: "select",
            key: "channel_type",
            formatter: Dict.getNameForList('channel_type'),
        }, {
            field: 'bizType',
            title: '业务类型',
            type: 'select',
            search: true,
            key: 'biz_type',
            formatter: Dict.getNameForList('biz_type')
        }, {
            field: 'transAmount',
            title: '变动金额',
            formatter: moneyFormat
        }, {
            field: 'preAmount',
            title: '变动前金额',
            formatter: moneyFormat
        }, {
            field: 'postAmount',
            title: '变动后金额',
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'jour_status',
            search: true,
            formatter: Dict.getNameForList('jour_status'),
        }, {
            title: "创建时间",
            field: "createDatetime",
            formatter: dateTimeFormat
        }]
    }, {
        title: '意见说明',
        field: 'adjustNote',
        maxlength: 250,
        required: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '802806'
    };

    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.adjustResult = '1';
                data.adjustUser = getUserName();
                reqApi({
                    code: '802801',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.adjustResult = '0';
                data.adjustUser = getUserName();
                reqApi({
                    code: '802801',
                    json: data
                }).done(function(data) {
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