$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

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
        readonly: true,
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'hl_status',
        formatter: Dict.getNameForList('hl_status'),
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
        field: 'approveUser',
        title: '审核人',
        formatter: function(v, data) {
            if (v) {
                return v;
            } else {
                $("#approveUser").parent().css("display", "none");
                $("#approveDatetime").parent().css("display", "none");
                $("#approveNote").parent().css("display", "none");
            }
        },
        readonly: true
    }, {
        field: 'approveDatetime',
        title: '审核日期',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: '意见说明',
        field: 'approveNote',
        readonly: true
    }];

    var options = {
        fields: fields,
        code: code,
        view: view,
        detailCode: '802806',
    };

    buildDetail(options);
});